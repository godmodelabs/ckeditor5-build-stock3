import { View } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';

export default class WrapperView extends View<HTMLDivElement> {
	constructor( locale: Locale, ...views: Array<View> ) {
		super( locale );

		this.setTemplate( {
			tag: 'div',
			children: this.createCollection( views )
		} );
	}
}
