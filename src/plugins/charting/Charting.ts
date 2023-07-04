import { Plugin } from '@ckeditor/ckeditor5-core';
import { createDropdown, addToolbarToDropdown } from '@ckeditor/ckeditor5-ui';
import ChartView from './ChartView';
import chartIcon from './chart.svg';
import './charting.css';
import type { BaseEvent, GetCallback } from '@ckeditor/ckeditor5-utils';

export type Chart = {
	imageSrc: string;
    thumbSrc: string;
    chartName: string;
    instrumentName: string;
	id: number;
};

export interface Stock3CKEditorChartingAdapter {
	getCharts(): Promise<Array<Chart>>;
}

export default class Charting extends Plugin {
	/**
     * Provided by the application and must be set before calling `Charting#init()`.
	 */
	public adapter: Stock3CKEditorChartingAdapter | null = null;

	public init(): void {
		const schema = this.editor.model.schema;
		const imageBlockRegistered = schema.isRegistered( 'imageBlock' );
		const imageInlineRegistered = schema.isRegistered( 'imageInline' );
		if ( imageBlockRegistered ) {
			schema.extend( 'imageBlock', { allowAttributes: 'chartId' } );
		}
		if ( imageInlineRegistered ) {
			schema.extend( 'imageInline', { allowAttributes: 'chartId' } );
		}

		this.editor.conversion.for( 'upcast' ).attributeToAttribute( {
			view: 'data-chartid',
			model: 'chartId'
		} );

		/**
		 * Downcast handler that puts the data-chartid attribute on the img element, not the containing element
		 */
		const convertChartId: GetCallback<BaseEvent> = ( evt, data, conversionApi ) => {
			if ( !conversionApi.consumable.consume( data.item, evt.name ) ) {
				return;
			}

			const viewWriter = conversionApi.writer;
			const figure = conversionApi.mapper.toViewElement( data.item );
			const img = figure.getChild( 0 ) || figure; // img usually the first child. if no children, we are the img element

			if ( data.attributeNewValue !== null ) {
				viewWriter.setAttribute( 'data-chartid', data.attributeNewValue, img );
			} else {
				viewWriter.removeAttribute( 'data-chartid', img );
			}
		};

		this.editor.conversion.for( 'dataDowncast' ).add( dispatcher => {
			// Note: simple downcast attributeToAttribute helper does not allow that we want the chartId on the img element
			if ( imageBlockRegistered ) {
				dispatcher.on( 'attribute:chartId:imageBlock', convertChartId );
			}
			if ( imageInlineRegistered ) {
				dispatcher.on( 'attribute:chartId:imageInline', convertChartId );
			}
		} );
	}

	public afterInit(): Promise<void> | void {
		if ( !this.adapter ) {
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
									const imageElement = writer.createElement( 'imageBlock', { src: chart.imageSrc, chartId: chart.id } );
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

					dropdownView.toolbarView?.set( {
						class: 'stock3 stock3-charting-toolbar'
					} );

					return dropdownView;
				} );
			} );
	}

	public static get pluginName() {
		return 'Charting' as const;
	}
}
