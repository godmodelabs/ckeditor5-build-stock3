import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';
import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import InputView from './InputView';

export default class FormView extends View {
	constructor( locale ) {
		super( locale );

		this.inputView = new InputView( locale );

		this.acceptButton = new ButtonView( locale );
		this.acceptButton.set( {
			type: 'submit',
			label: 'Speichern',
			icon: checkIcon,
			tooltip: true,
			class: 'stock3 stock3-accept'
		} );

		this.cancelButton = new ButtonView( locale );
		this.cancelButton.set( {
			label: 'Abbrechen',
			icon: cancelIcon,
			tooltip: true,
			class: 'stock3 stock3-cancel'
		} );
		this.cancelButton.on( 'execute', () => this.fire( 'cancel' ) );

		this.setTemplate( {
			tag: 'form',

			children: this.createCollection( [
				this.inputView,
				this.acceptButton,
				this.cancelButton
			] ),
			attributes: {
				class: [
					'stock3',
					'stock3-form'
				]
			}
		} );
	}
}
