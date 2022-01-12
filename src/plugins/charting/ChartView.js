import View from '@ckeditor/ckeditor5-ui/src/view';

export default class ChartView extends View {
	constructor( locale, chart ) {
		super( locale );

		this.setTemplate( {
			tag: 'div',
			children: [
				{
					tag: 'img',
					attributes: {
						src: chart.thumbSrc
					}
				},
				{
					tag: 'span',
					children: [
						{
							tag: 'span',
							children: [ chart.chartName ],
							attributes: { class: [ 'stock3', 'stock3-charting-chartName' ] }
						},
						{
							tag: 'span',
							children: [ chart.instrumentName ],
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
				click: this.bindTemplate.to( 'clicked' )
			}
		} );
	}
}
