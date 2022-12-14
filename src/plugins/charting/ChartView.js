import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class ChartView extends ButtonView {
	constructor( locale, chart ) {
		super( locale );

		this.setTemplate( {
			tag: 'button', // first element must be focus-able
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
				click: this.bindTemplate.to( 'execute' )
			}
		} );
	}
}
