/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor';
import InsertImage from './plugins/insertImage/InsertImage';
import Emojis from './plugins/emojis/Emojis';
import Charting from './plugins/charting/Charting';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import colors from './plugins/colors.list';

export default class Stock3Editor extends ClassicEditorBase {}

// Plugins to include in the build.
Stock3Editor.builtinPlugins = [
	Essentials,
	Bold,
	Italic,
	FontColor,
	FontBackgroundColor,
	Link,
	Image,
	ImageStyle,
	InsertImage,
	Emojis,
	Charting,
	Paragraph
];

// Editor configuration.
Stock3Editor.defaultConfig = {
	toolbar: [
		'bold',
		'italic',
		'fontColor',
		'fontBackgroundColor',
		'link',
		'insertImage',
		'emojis',
		'charting'
	],
	fontColor: { colors, columns: 11 },
	fontBackgroundColor: { colors, columns: 11 },

	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'de'
};
