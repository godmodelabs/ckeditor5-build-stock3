import { icons } from '@ckeditor/ckeditor5-core';
import { ButtonView, View } from '@ckeditor/ckeditor5-ui';
import InputView from './InputView';
import { type Locale } from '@ckeditor/ckeditor5-utils';

export default class FormView extends View<HTMLFormElement> {
	public inputView: InputView;

	public acceptButton: ButtonView;

	public cancelButton: ButtonView;

	constructor( locale?: Locale ) {
		super( locale );

		this.inputView = new InputView( locale );

		this.acceptButton = new ButtonView( locale );
		this.acceptButton.set( {
			type: 'submit',
			label: 'Speichern',
			icon: icons.check,
			tooltip: true,
			class: 'stock3 stock3-accept'
		} );

		this.cancelButton = new ButtonView( locale );
		this.cancelButton.set( {
			label: 'Abbrechen',
			icon: icons.cancel,
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
