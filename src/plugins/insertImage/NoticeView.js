import View from '@ckeditor/ckeditor5-ui/src/view';

export default class NoticeView extends View {
	constructor( locale ) {
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
						this._createItem( 'https://picload.org/' ),
						this._createItem( 'https://www.pic-upload.de/' ),
						this._createItem( 'https://gifyu.com/' ),
						this._createItem( 'https://postimage.io/' ),
						this._createItem( 'https://imgbox.com/' )
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

	_createItem( href ) {
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
