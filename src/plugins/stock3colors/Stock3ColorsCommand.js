import Command from '@ckeditor/ckeditor5-core/src/command';

const STOCK3STYLE = 'stock3Style';

export default class Stock3ColorsCommand extends Command {
	/**
	 * Executes the command. Applies the `value` of the {@link #attributeKey} to the selection.
	 * If no `value` is passed, it removes the attribute from the selection.
	 *
	 * @protected
	 * @param {Object} [options] Options for the executed command.
	 * @param {String} [options.value] The value to apply.
	 * @fires execute
	 */
	execute( options = {} ) {
		const model = this.editor.model;
		const doc = model.document;
		const selection = doc.selection;
		const style = options.value;

		model.change( writer => {
			if ( selection.isCollapsed ) {
				if ( style ) {
					writer.setSelectionAttribute( STOCK3STYLE, style );
				} else {
					writer.removeSelectionAttribute( STOCK3STYLE );
				}
			} else {
				const ranges = model.schema.getValidRanges( selection.getRanges(), STOCK3STYLE );

				for ( const range of ranges ) {
					if ( style ) {
						writer.setAttribute( STOCK3STYLE, style, range );
					} else {
						writer.removeAttribute( STOCK3STYLE, range );
					}
				}
			}
		} );
	}

	/**
	 * Updates the command's {@link #value} and {@link #isEnabled} based on the current selection.
	 */
	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;

		this.value = selection.getAttribute( STOCK3STYLE );
		this.isEnabled = model.schema.checkAttributeInSelection( selection, STOCK3STYLE );
	}
}
