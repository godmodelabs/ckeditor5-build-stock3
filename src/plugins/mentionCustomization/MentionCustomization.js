import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * This will transform user mentionings from the default output to the output that the api accepts as mention
 * @see example https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#customizing-the-output
 */
export default class MentionCustomization extends Plugin {
	init() {
		const editor = this.editor;

		// Transform from dom to model
		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				key: 'data-user-id',
			},
			model: {
				key: 'mention',
				value: viewItem => {
					return editor.plugins.get( 'Mention' ).toMentionAttribute( viewItem, {
						// other properties
						userId: viewItem.getAttribute( 'data-user-id' )
					} );
				}
			},
			converterPriority: 'high'
		} );

		// Downcast the model 'mention' text attribute to a view dom element.
		editor.conversion.for( 'downcast' ).attributeToElement( {
			model: 'mention',
			view: ( modelAttributeValue, { writer } ) => {
				// Do not convert empty attributes (lack of value means no mention).
				if ( !modelAttributeValue ) {
					return;
				}

				return writer.createAttributeElement( 'span', {
					'data-user-id': modelAttributeValue.userId,
				}, {
					// Make mention attribute to be wrapped by other attribute elements.
					priority: 20,
					// Prevent merging mentions together.
					id: modelAttributeValue.uid
				} );
			},
			converterPriority: 'high'
		} );
	}

	static get pluginName() {
		return 'MentionCustomization';
	}
}
