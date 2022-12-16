import { Plugin } from 'ckeditor5/src/core';
import Stock3ColorsEditing from './Stock3ColorsEditing';
import Stock3ColorsUI from './Stock3ColorsUI';
import './stock3colors.css';

/**
 * The stock3 colors plugin
 * This plugin handles stock3 colors classes
 */

export default class Stock3Colors extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ Stock3ColorsEditing, Stock3ColorsUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Stock3Colors';
	}
}
