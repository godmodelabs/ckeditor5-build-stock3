import { Plugin } from '@ckeditor/ckeditor5-core';
import { createDropdown, addToolbarToDropdown, ViewCollection } from '@ckeditor/ckeditor5-ui';
import { type GetCallback, type BaseEvent } from '@ckeditor/ckeditor5-utils';
import Stock3ColorsUIButton from './Stock3ColorsUIButton';
import Stock3ColorsList from './Stock3ColorsList';

const STOCK3STYLE = 'stock3Style';

export default class Stock3ColorsUI extends Plugin {
	public init(): void {
		const editor = this.editor;
		const colorsHelper = new Stock3ColorsList( ( editor.config.get( 'stock3colors.enabledStyles' ) ) as Array<string> | undefined );
		const availableStyles = colorsHelper.getAvailable();
		const uiListClassName = editor.config.get( 'stock3colors.uiListClassName' ) || '';
		const titleByClasses = colorsHelper.getTitleByClasses();

		editor.ui.componentFactory.add( 'stock3colors', locale => {
			const itemDefinitions = new ViewCollection();
			const dropdownView = createDropdown( locale );
			const command = editor.commands.get( STOCK3STYLE );
			if ( !command ) {
				console.error( 'ckeditor Stock3ColorsUI plugin error, \'stock3Style\' command not available' );
				return dropdownView;
			}

			const createClickFunction: ( classes?: string ) => GetCallback<BaseEvent> = classes => {
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

			dropdownView.once( 'change:isOpen', () => {
				// Toolbar view is only created once the dropdown is opened for the first time (i.e. lazily)
				dropdownView.toolbarView!.set( {
					class: `stock3 stock3-style-toolbar ${ uiListClassName }`
				} );
			} );
			dropdownView.buttonView.set( {
				isOn: false,
				withText: true,
				tooltip: 'Format-Stile'
			} );

			dropdownView.bind( 'isEnabled' ).to( command, 'isEnabled', _ => _ && !!availableStyles.length );
			dropdownView.buttonView.bind( 'label' ).to( command, 'value', _ => _ ? titleByClasses[ String( _ ) ] : 'Standard' );

			return dropdownView;
		} );
	}
}
