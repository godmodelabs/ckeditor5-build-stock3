import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';

type LabelInfo = { title: string; classes: string };

export default class Stock3ColorsUIButton extends ButtonView {
	constructor( locale: Locale, labelInfo: LabelInfo ) {
		super( locale );

		this.setTemplate( {
			tag: 'button',
			children: [
				{
					tag: 'span',
					children: [
						labelInfo.title
					],
					attributes: { class: [ labelInfo.classes, 'ck-reset_all-excluded' ] }
				}
			],
			attributes: {
				class: [
					'stock3',
					'stock3-style-item',
					'ck-reset_all-excluded'
				]
			},
			on: {
				click: this.bindTemplate.to( 'execute' )
			}
		} );
	}
}
