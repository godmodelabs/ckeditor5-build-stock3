import View from '@ckeditor/ckeditor5-ui/src/view';

export default class WrapperView extends View {
	constructor( locale, ...views ) {
		super( locale );

		this.setTemplate( {
			tag: 'div',
			children: this.createCollection( views )
		} );
	}
}
