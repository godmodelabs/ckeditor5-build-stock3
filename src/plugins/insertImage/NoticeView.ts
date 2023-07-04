import { View } from '@ckeditor/ckeditor5-ui';
import { type Locale } from '@ckeditor/ckeditor5-utils';

export default class NoticeView extends View<HTMLLIElement> {
	constructor( locale?: Locale ) {
		super( locale );

		this.setTemplate( {
			tag: 'p',
			children: [
				'Für eine einwandfreie Darstellung binden Sie Ihre Bilder bitte über https ein.',
				{ tag: 'br' },
				'Kompatible Image-Hoster sind unter anderem folgende:',
				{
					tag: 'ul',
					children: [
						this.createItem( 'https://picload.org/' ),
						this.createItem( 'https://www.pic-upload.de/' ),
						this.createItem( 'https://gifyu.com/' ),
						this.createItem( 'https://postimage.io/' ),
						this.createItem( 'https://imgbox.com/' )
					]
				}
			],
			attributes: {
				class: [
					'stock3',
					'stock3-notice'
				]
			}
		} );
	}

	private createItem( href: string ) {
		return {
			tag: 'li',
			children: [ {
				tag: 'a',
				children: [ href ],
				attributes: {
					href,
					target: '_blank',
					rel: 'nofollow noopener'
				}
			} ]
		};
	}
}
