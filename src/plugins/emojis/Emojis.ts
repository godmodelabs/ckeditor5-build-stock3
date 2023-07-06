import { Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView, createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui';
import emojiList from './emojiList';
import emojiIcon from './emoji.svg';

export default class Emojis extends Plugin {
	public init(): void {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'emojis', locale => {
			const buttons = emojiList.map( _ => {
				const view = new ButtonView( locale );
				view.set( {
					label: _,
					withText: true
				} );
				view.on( 'execute', () => {
					editor.model.change( writer => {
						editor.model.insertContent( writer.createText( _ ), editor.model.document.selection );
					} );
				} );
				return view;
			} );

			const view = createDropdown( locale );

			view.buttonView.set( {
				label: 'Emoji hinzufügen',
				icon: emojiIcon,
				tooltip: true
			} );

			addToolbarToDropdown( view, buttons );

			view.once( 'change:isOpen', () => {
				// Toolbar view is only created once the dropdown is opened for the first time (i.e. lazily)
				view.toolbarView!.set( {
					maxWidth: '395px'
				} );
			} );

			return view;
		} );
	}

	public static get pluginName() {
		return 'Emojis' as const;
	}
}
