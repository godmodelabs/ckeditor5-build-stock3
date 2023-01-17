/**
 * This plugin should enable the user to insert videos into the text.
 * It is simpler than the media plugin. If you require preview etc in the future, it might be better to create a customization plugin.
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Stock3VideoEditing from './Stock3VideoEditing';
import Stock3VideoAutoEmbed from './Stock3VideoAutoEmbed';
import './stock3video.css';

export default class Stock3Video extends Plugin {
	static get requires() {
		return [ Stock3VideoEditing, Stock3VideoAutoEmbed ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Stock3Video';
	}
}
