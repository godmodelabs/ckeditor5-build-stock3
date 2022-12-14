import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ChartView from './ChartView';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import chartIcon from './chart.svg';
import './charting.css';

export default class Charting extends Plugin {
	constructor( arg ) {
		super( arg );
		this.adapter = null;
	}

	afterInit() {
		if ( !this.adapter || !this.adapter.getCharts ) {
			// eslint-disable-next-line no-undef
			console.warn( 'ckeditor Charting Plugin disabled, adapter not found' );
			return;
		}

		return this.adapter.getCharts()
			.then( charts => {
				this.editor.ui.componentFactory.add( 'charting', locale => {
					const dropdownView = createDropdown( locale );
					const hasCharts = !!charts.length;

					dropdownView.buttonView.set( {
						label: hasCharts ? 'Chart hinzufügen' : 'Kein Chart verfügbar',
						icon: chartIcon,
						tooltip: true,
						isEnabled: hasCharts
					} );

					const buttons = charts.map( chart => {
						const view = new ChartView( locale, chart );
						view.on( 'execute', () => {
							if ( chart.imageSrc ) {
								this.editor.model.change( writer => {
									const imageElement = writer.createElement( 'imageBlock', { src: chart.imageSrc } );
									this.editor.model.insertContent( imageElement, this.editor.model.document.selection );
								} );
							}
							dropdownView.set( {
								isOpen: false
							} );
						} );
						return view;
					} );

					addToolbarToDropdown( dropdownView, buttons );

					dropdownView.toolbarView.set( {
						class: 'stock3 stock3-charting-toolbar'
					} );

					return dropdownView;
				} );
			} );
	}

	static get pluginName() {
		return 'Charting';
	}
}
