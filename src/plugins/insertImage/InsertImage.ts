import { icons, Plugin } from '@ckeditor/ckeditor5-core';
import { clickOutsideHandler, submitHandler, ButtonView, BalloonPanelView } from '@ckeditor/ckeditor5-ui';
// TODO: check out if this is available yet
// eslint-disable-next-line ckeditor5-rules/allow-imports-only-from-main-package-entry-point
import { generatePositions } from '@ckeditor/ckeditor5-ui/src/panel/balloon/balloonpanelview';
import WrapperView from './WrapperView';
import FormView from './FormView';
import NoticeView from './NoticeView';
import './insertImage.css';

export default class InsertImage extends Plugin {
	public init(): void {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'insertImage', locale => {
			const button = new ButtonView( locale );
			const panel = new BalloonPanelView( locale );
			const wrapper = new WrapperView( locale, button, panel );
			const form = new FormView( locale );
			const notice = new NoticeView( locale );

			// Cleanup and close everything
			const close = () => {
				form.element?.reset();
				panel.unpin();
				button.set( {
					isOn: false,
					tooltip: true
				} );
			};

			// Generate positions that can be used by our panel
			const positions = generatePositions( {
				sideOffset: 0,
				heightOffset: 0,
				config: { withArrow: false }
			} );

			/*
			 * Prepare our insertImage button and handle clicks on it.
			 */

			button.set( {
				label: 'Bild hinzufügen',
				icon: icons.image,
				tooltip: true,
				isOn: false
			} );

			button.on( 'execute', () => {
				// If our button is already active, close our panel
				if ( button.isOn ) {
					close();
					return;
				}

				// Show our button as active, deactivate the tooltip
				button.set( {
					isOn: true,
					tooltip: false
				} );

				// Open our panel
				panel.pin( {
					target: button.element!,
					positions: [ positions.southWestArrowNorthWest ]
				} );

				// Close on click outside of our wrapper element.
				clickOutsideHandler( {
					emitter: wrapper,
					activator: () => true,
					contextElements: [ wrapper.element! ],
					callback: close
				} );

				// Check if only a single image is selected, if so set that src as the default input value
				const selection = editor.model.document.selection.getSelectedElement();
				if ( selection?.name === 'imageBlock' ) {
					const src = ( selection as unknown as HTMLImageElement ).getAttribute( 'src' );
					if ( src && form.inputView.element ) {
						form.inputView.element.value = src;
					}
				}
			} );

			/*
			 * Prepare our Panel, containing the input form and notice.
			 */

			panel.content.add( form );
			panel.content.add( notice );
			panel.on( 'change:isVisible', ( _eventInfo, _name, value ) => {
				// Auto focus after opening the panel
				if ( value ) {
					// delay until all css classes are set, so that the input is visible
					// eslint-disable-next-line no-undef
					setTimeout( () => form.inputView.element?.focus(), 0 );
				}
			} );

			/*
			 * Handle events from our input form.
			 */

			submitHandler( { view: form } );
			form.on( 'submit', ( { source } ) => {
				const formView = source as FormView;
				if ( formView.element ) {
					const formData = new FormData( formView.element );
					const url = formData.get( 'url' );
					if ( url ) {
						editor.model.change( writer => {
							const imageElement = writer.createElement( 'imageBlock', { src: url } );
							editor.model.insertContent( imageElement, editor.model.document.selection );
						} );
					}
				}
				close();
			} );

			form.on( 'cancel', close );

			return wrapper;
		} );
	}

	public static get pluginName() {
		return 'InsertImage' as const;
	}
}
