import { View } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';

export default class InputView extends View<HTMLInputElement> {
	constructor( locale?: Locale ) {
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
