import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import emojiIcon from './emoji.svg';
import emojiList from './emoji.list';

export default class Emojis extends Plugin {
	init() {
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

			view.toolbarView.set( {
				maxWidth: '395px'
			} );

			return view;
		} );
	}

	static get pluginName() {
		return 'Emojis';
	}
}
