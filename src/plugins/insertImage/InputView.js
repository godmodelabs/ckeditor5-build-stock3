import View from '@ckeditor/ckeditor5-ui/src/view';

export default class InputView extends View {
	constructor( locale ) {
		super( locale );

		this.setTemplate( {
			tag: 'input',
			attributes: {
				placeholder: 'Bild-URL',
				name: 'url',
				class: [
					'stock3',
					'stock3-input'
				]
			}
		} );
	}
}
