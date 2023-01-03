// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// CKEditor Plugins
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import ImageBlock from '@ckeditor/ckeditor5-image/src/imageblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';

// Stock3 Custom Plugins
import InsertImage from './plugins/insertImage/InsertImage';
import Emojis from './plugins/emojis/Emojis';
import Charting from './plugins/charting/Charting';
import MentionCustomization from './plugins/mentionCustomization/MentionCustomization';
import Stock3Colors from './plugins/stock3colors/Stock3Colors';

export default class Stock3Editor extends ClassicEditorBase {}

// Plugins to include in the build.
Stock3Editor.builtinPlugins = [
	Essentials,
	Bold,
	Italic,
	Link,
	ImageBlock,
	Paragraph,
	Mention,

	// Custom
	InsertImage,
	Emojis,
	Charting,
	Stock3Colors,
	MentionCustomization
];

// Editor configuration.
Stock3Editor.defaultConfig = {
	toolbar: [
		'bold',
		'italic',
		'link',
		'insertImage',
		'emojis',
		'charting',
		'|',
		'stock3colors'
	],

	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'de'
};
