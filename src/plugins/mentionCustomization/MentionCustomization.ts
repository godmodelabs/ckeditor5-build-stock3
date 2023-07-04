import { Plugin } from '@ckeditor/ckeditor5-core';
import { type Element } from '@ckeditor/ckeditor5-engine';

/**
 * This will transform user mentionings from the default output to the output that the api accepts as mention
 * @see example https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#customizing-the-output
 */
export default class MentionCustomization extends Plugin {
	public init(): void {
		const editor = this.editor;

		// Transform from dom to model
		editor.conversion.for( 'upcast' ).elementToAttribute( {
			view: {
				name: 'span',
				attributes: 'data-user-id'
			},
			model: {
				key: 'mention',
				value: ( viewItem: Element ) => {
					return editor.plugins.get( 'Mention' ).toMentionAttribute( viewItem, {
						// @ts-expect-error This works, it's an issue w/ CKEditor's types. It's exactly the code they
						// use in the doc example.
						userId: String( viewItem.getAttribute( 'data-user-id' ) )
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
					'data-user-id': modelAttributeValue.userId
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

	public static get pluginName() {
		return 'MentionCustomization' as const;
	}
}
