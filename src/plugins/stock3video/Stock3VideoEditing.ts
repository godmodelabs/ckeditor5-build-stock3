import { Plugin } from '@ckeditor/ckeditor5-core';
import { Widget, toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget';

export default class Stock3VideoEditing extends Plugin {
	public static get requires() {
		return [ Widget ] as const;
	}

	public init(): void {
		this.defineSchema();
		this.setupConverters();
	}

	private defineSchema(): void {
		const schema = this.editor.model.schema;

		schema.register( 'media', {
			isObject: true,
			isLimit: true,
			allowWhere: '$block',
			allowAttributes: [ 'url', 'type' ]
		} );
	}

	private setupConverters(): void {
		const editor = this.editor;
		editor.conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'media',
			view: ( modelElement, { writer } ) => {
				return writer.createContainerElement( 'p', {}, [
					writer.createText( String( modelElement.getAttribute( 'url' ) ) )
				] );
			}
		} );
		editor.conversion.for( 'editingDowncast' ).elementToStructure( {
			model: 'media',
			view: ( modelElement, { writer } ) => {
				const url = String(modelElement.getAttribute( 'url' ));
				const type = String(modelElement.getAttribute( 'type' ));
				const section = writer.createContainerElement(
					'div',
					{
						class: `stock3video ${ type }`
					},
					[
						writer.createContainerElement( 'div', { class: 'stock3video-title' }, [ writer.createText( type ) ] ),
						writer.createContainerElement( 'div', { class: 'stock3video-url' }, [ writer.createText( url ) ] )
					]
				);
				return toWidget( section, writer, { label: `Media ${ url }` } );
			}
		} );
		editor.editing.mapper.on(
			'viewToModelPosition',
			viewToModelPositionOutsideModelElement( editor.model, viewElement => viewElement.hasClass( 'stock3video' ) )
		);
		editor.conversion.for( 'upcast' ).add( dispatcher => {
			dispatcher.on( 'element:p', ( _evt, data, conversionApi ) => {
				const { viewItem } = data;
				const {
					consumable,
					writer,
					safeInsert,
					updateConversionResult,
					convertChildren
				} = conversionApi;

				if ( viewItem.childCount !== 1 ) {
					return;
				}
				const firstChildItem = viewItem.getChild( 0 );
				if ( !firstChildItem.is( 'text' ) ) {
					return;
				}
				if ( !consumable.test( viewItem, { name: true } ) || !consumable.test( firstChildItem, { name: true } ) ) {
					return;
				}

				const mediaInfo = this.getMediaInfo( firstChildItem.data );
				if ( !mediaInfo ) {
					return;
				}

				const model = writer.createElement( 'media', {
					url: mediaInfo.url,
					type: mediaInfo.type
				} );
				if ( !safeInsert( model, data.modelCursor ) ) {
					return;
				}
				consumable.consume( viewItem, { name: true } );
				consumable.consume( firstChildItem, { name: true } );
				convertChildren( viewItem, data.modelCursor );
				updateConversionResult( model, data );
			}, { priority: 'high' } );
		} );
	}

	public getMediaInfo( urlString: string ): { url: string; type: string } | null {
		// test media string
		let url;
		try {
			url = new URL( urlString );
		} catch ( e ) {
			// no url
			return null;
		}

		let type = null;
		switch ( url.hostname ) {
			case 'youtube.com':
			case 'www.youtube.com':
			case 'm.youtube.com':
			case 'youtu.be':
				type = 'youtube';
				break;
			case 'vimeo.com':
			case 'www.vimeo.com':
			case 'player.vimeo.com':
				type = 'vimeo';
				break;
			case 'twitter.com':
			case 'www.twitter.com':
				type = 'twitter';
				break;
		}

		if ( !type ) {
			return null;
		}
		return {
			url: urlString,
			type
		};
	}
}
