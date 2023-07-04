// The editor creator to use.
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

// CKEditor Plugins
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { ImageBlock, AutoImage } from '@ckeditor/ckeditor5-image';
import { Link } from '@ckeditor/ckeditor5-link';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Mention } from '@ckeditor/ckeditor5-mention';

// Stock3 Custom Plugins
import InsertImage from './plugins/insertImage/InsertImage';
import Emojis from './plugins/emojis/Emojis';
import Charting from './plugins/charting/Charting';
import MentionCustomization from './plugins/mentionCustomization/MentionCustomization';
import Stock3Colors from './plugins/stock3colors/Stock3Colors';
import Stock3Video from './plugins/stock3video/Stock3Video';

export default class Stock3Editor extends ClassicEditor {
	// Plugins to include in the build.
	public static builtinPlugins = [
		Essentials,
		Bold,
		Italic,
		Link,
		ImageBlock,
		AutoImage,
		Paragraph,
		Mention,

		// Custom
		InsertImage,
		Emojis,
		Charting,
		Stock3Colors,
		MentionCustomization,
		Stock3Video
	];

	// Editor configuration
	public static defaultConfig = {
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
}
