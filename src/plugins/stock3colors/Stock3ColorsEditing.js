import { Plugin } from 'ckeditor5/src/core';
import Stock3ColorsCommand from './Stock3ColorsCommand';
import Stock3ColorsList from './Stock3ColorsList';

const STOCK3STYLE = 'stock3Style';

export default class Stock3ColorsEditing extends Plugin {
	init() {
		const editor = this.editor;

		editor.model.schema.extend( '$text', { allowAttributes: STOCK3STYLE } );
		editor.model.schema.setAttributeProperties( STOCK3STYLE, {
			isFormatting: true // https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_schema-AttributeProperties.html
		} );

		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: STOCK3STYLE,
			view: ( modelAttributeValue, conversionApi ) => {
				const { writer } = conversionApi;
				return writer.createAttributeElement( 'span', {
					class: modelAttributeValue
				} );
			}
		} );

		const availableStyles = new Stock3ColorsList( editor.config.get( 'stock3colors.enabledStyles' ) ).getAvailable();

		const regex = new RegExp( availableStyles.map( _ => _.classes ).join( '|' ) );

		if ( availableStyles.length ) {
			editor.conversion.for( 'upcast' ).elementToAttribute( {
				view: {
					name: 'span',
					classes: regex
				},
				model: {
					key: STOCK3STYLE,
					value: viewElement => viewElement.getAttribute( 'class' )
				}
			} );
		}

		editor.commands.add( STOCK3STYLE, new Stock3ColorsCommand( editor ) );
	}
}
