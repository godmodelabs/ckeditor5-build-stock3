import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addToolbarToDropdown } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';
import Stock3ColorsUIButton from './Stock3ColorsUIButton';
import Stock3ColorsList from './Stock3ColorsList';

const STOCK3STYLE = 'stock3Style';

export default class Stock3ColorsUI extends Plugin {
	init() {
		const editor = this.editor;
		const colorsHelper = new Stock3ColorsList( editor.config.get( 'stock3colors.enabledStyles' ) );
		const availableStyles = colorsHelper.getAvailable();
		const uiListClassName = editor.config.get( 'stock3colors.uiListClassName' ) || '';
		const titleByClasses = colorsHelper.getTitleByClasses();

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
				class: `stock3 stock3-style-toolbar ${ uiListClassName }`
			} );
			dropdownView.buttonView.set( {
				isOn: false,
				withText: true,
				tooltip: 'Format-Stile'
			} );

			dropdownView.bind( 'isEnabled' ).to( command, 'isEnabled', _ => _ && availableStyles.length );
			dropdownView.buttonView.bind( 'label' ).to( command, 'value', _ => _ ? titleByClasses[ _ ] : 'Standard' );

			return dropdownView;
		} );
	}
}
