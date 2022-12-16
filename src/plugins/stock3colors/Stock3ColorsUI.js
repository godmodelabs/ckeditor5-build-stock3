import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import Stock3ColorsUIButton from './Stock3ColorsUIButton';

const STOCK3STYLE = 'stock3Style';

export default class Stock3ColorsUI extends Plugin {
	init() {
		const editor = this.editor;
		const availableStyles = editor.config.get( 'stock3colors.availableStyles' );
		const titleByClasses = availableStyles.reduce( ( acc, curr ) => {
			acc[ curr.classes ] = curr.title;
			return acc;
		}, {} );

		editor.ui.componentFactory.add( 'stock3colors', locale => {
			const itemDefinitions = new Collection();
			const dropdownView = createDropdown( locale );
			const command = editor.commands.get( STOCK3STYLE );

			const createClickFunction = classes => {
				return () => {
					editor.execute( STOCK3STYLE, classes ? { value: classes } : undefined );
					editor.editing.view.focus();
				};
			};

			const resetButton = new Stock3ColorsUIButton( locale, {
				title: 'Standard',
				classes: ''
			} );
			resetButton.on( 'execute', createClickFunction( '' ) );

			itemDefinitions.add( resetButton );

			for ( const style of availableStyles ) {
				const btn = new Stock3ColorsUIButton( locale, style );
				btn.on( 'execute', createClickFunction( style.classes ) );
				itemDefinitions.add( btn );
			}

			addToolbarToDropdown( dropdownView, itemDefinitions );

			dropdownView.toolbarView.set( {
				class: 'stock3 stock3-style-toolbar'
			} );
			dropdownView.buttonView.set( {
				isOn: false,
				withText: true,
				tooltip: 'Format-Stile'
			} );

			dropdownView.bind( 'isEnabled' ).to( command, 'isEnabled' );
			dropdownView.buttonView.bind( 'label' ).to( command, 'value', _ => _ ? titleByClasses[ _ ] : 'Standard' );

			return dropdownView;
		} );
	}
}
