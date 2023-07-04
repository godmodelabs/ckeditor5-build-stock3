import { Plugin } from '@ckeditor/ckeditor5-core';
import { LiveRange, LivePosition } from '@ckeditor/ckeditor5-engine';
import { Clipboard } from '@ckeditor/ckeditor5-clipboard';
import { Delete } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { global } from '@ckeditor/ckeditor5-utils';
import Stock3VideoEditing from './Stock3VideoEditing';

const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w-]+\.[\w-.~:/?#[\]@!$&'()*+,;=%]+$/;

/**
  * The auto-media embed plugin. It recognizes media links in the pasted content and embeds
  * them shortly after they are injected into the document.
  * (Mainly copied from ckeditor5-media-embed/src/automediaembed.js and slightly adapted for our purposes)
  *
  */
export default class AutoMediaEmbed extends Plugin {
	/**
	 * The paste–to–embed `setTimeout` ID. Stored as a property to allow
	 * cleaning of the timeout.
	 */
	private timeoutId: number | null = null;

	/**
	 * The position where the `<media>` element will be inserted after the timeout,
	 * determined each time the new content is pasted into the document.
	 *
	 * @member {module:engine/model/liveposition~LivePosition} #_positionToInsert
	 */
	private positionToInsert: LivePosition | null = null;

	/**
      * @inheritDoc
      */
	public static get requires() {
		return [ Clipboard, Delete, Undo ] as const;
	}

	/**
      * @inheritDoc
      */
	public static get pluginName() {
		return 'Stock3VideoAutoEmbed' as const;
	}

	/**
      * @inheritDoc
      */
	public init(): void {
		const editor = this.editor;
		const modelDocument = editor.model.document;

		// We need to listen on `Clipboard#inputTransformation` because we need to save positions of selection.
		// After pasting, the content between those positions will be checked for a URL that could be transformed
		// into media.
		this.listenTo( editor.plugins.get( 'ClipboardPipeline' ), 'inputTransformation', () => {
			const firstRange = modelDocument.selection.getFirstRange()!;

			const leftLivePosition = LivePosition.fromPosition( firstRange.start );
			leftLivePosition.stickiness = 'toPrevious';

			const rightLivePosition = LivePosition.fromPosition( firstRange.end );
			rightLivePosition.stickiness = 'toNext';

			modelDocument.once( 'change:data', () => {
				this.embedMediaBetweenPositions( leftLivePosition, rightLivePosition );

				leftLivePosition.detach();
				rightLivePosition.detach();
			}, { priority: 'highest' } );
		} );

		editor.commands.get( 'undo' )?.on( 'execute', () => {
			if ( this.timeoutId && this.positionToInsert ) {
				global.window.clearTimeout( this.timeoutId );
				this.positionToInsert.detach();

				this.timeoutId = null;
				this.positionToInsert = null;
			}
		}, { priority: 'highest' } );
	}

	/**
	 * Analyzes the part of the document between provided positions in search for a URL representing media.
	 * When the URL is found, it is automatically converted into media.
	 *
	 * @protected
	 * @param leftPosition Left position of the selection.
	 * @param rightPosition Right position of the selection.
	 */
	private embedMediaBetweenPositions( leftPosition: LivePosition, rightPosition: LivePosition ): void {
		const editor = this.editor;
		const mediaEditing = editor.plugins.get( Stock3VideoEditing );
		// TODO: Use marker instead of LiveRange & LivePositions.
		const urlRange = new LiveRange( leftPosition, rightPosition );
		const walker = urlRange.getWalker( { ignoreElementEnd: true } );

		let url = '';

		for ( const node of walker ) {
			if ( node.item.is( '$textProxy' ) ) {
				url += node.item.data;
			}
		}

		url = url.trim();

		// If the URL does not match to universal URL regexp, let's skip that.
		if ( !url.match( URL_REGEXP ) ) {
			urlRange.detach();

			console.debug( 'no url' );
			return;
		}

		// If the URL represents a media, let's use it.
		const mediaInfo = mediaEditing.getMediaInfo( url );
		if ( !mediaInfo ) {
			urlRange.detach();
			console.debug( 'no media info' );

			return;
		}

		/* const mediaEmbedCommand = editor.commands.get( 'mediaEmbed' );

		// Do not anything if media element cannot be inserted at the current position (#47).
		if ( !mediaEmbedCommand.isEnabled ) {
			urlRange.detach();

			return;
		}*/

		// Position won't be available in the `setTimeout` function so let's clone it.
		this.positionToInsert = LivePosition.fromPosition( leftPosition );

		// This action mustn't be executed if undo was called between pasting and auto-embedding.
		this.timeoutId = global.window.setTimeout( () => {
			editor.model.change( writer => {
				this.timeoutId = null;

				writer.remove( urlRange );
				urlRange.detach();

				let insertionPosition: LivePosition;

				// Check if position where the media element should be inserted is still valid.
				// Otherwise, leave it as undefined to use document.selection - default behavior of model.insertContent().
				if (!this.positionToInsert) {
					return;
				}
				if ( this.positionToInsert.root.rootName !== '$graveyard' ) {
					insertionPosition = this.positionToInsert;
				}

				// insertMedia( editor.model, url, insertionPosition, false );
				editor.model.change( writer => {
					const mediaElement = writer.createElement( 'media', { url: mediaInfo.url, type: mediaInfo.type } );
					editor.model.insertObject( mediaElement, insertionPosition, null, { setSelection: 'on', findOptimalPosition: undefined } );
				} );

				this.positionToInsert.detach();
				this.positionToInsert = null;
			} );

			editor.plugins.get( 'Delete' ).requestUndoOnBackspace();
		}, 100 );
	}
}
