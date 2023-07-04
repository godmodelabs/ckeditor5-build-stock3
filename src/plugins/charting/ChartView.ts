import { ButtonView } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';
import { type Chart } from './Charting';

export default class ChartView extends ButtonView {
	constructor( locale: Locale, chartConfig: Chart ) {
		super( locale );

		this.setTemplate( {
			tag: 'button', // first element must be focus-able
			children: [
				{
					tag: 'img',
					attributes: {
						src: chartConfig.thumbSrc
					}
				},
				{
					tag: 'span',
					children: [
						{
							tag: 'span',
							children: [ chartConfig.chartName ],
							attributes: { class: [ 'stock3', 'stock3-charting-chartName' ] }
						},
						{
							tag: 'span',
							children: [ chartConfig.instrumentName ],
							attributes: { class: [ 'stock3', 'stock3-charting-instrumentName' ] }
						}
					],
					attributes: { class: [ 'stock3', 'stock3-charting-info' ] }
				}
			],
			attributes: {
				class: [
					'stock3',
					'stock3-charting-item'
				]
			},
			on: {
				click: this.bindTemplate.to( 'execute' )
			}
		} );
	}
}
