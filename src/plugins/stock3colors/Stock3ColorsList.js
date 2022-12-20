const styles = [
	{
		'title': 'Sonderwarnung',
		'classes': 'special-warning'
	},
	{
		'title': 'Basiswissen',
		'classes': 'basic-knowledge'
	},
	{
		'title': 'Grand Super Cycle',
		'classes': 'ew-grand-super-cycle'
	},
	{
		'title': 'Super Cycle',
		'classes': 'ew-super-cycle'
	},
	{
		'title': 'Cycle',
		'classes': 'ew-cycle'
	},
	{
		'title': 'Primary',
		'classes': 'ew-primary'
	},
	{
		'title': 'Intermediate',
		'classes': 'ew-intermediate'
	},
	{
		'title': 'Minor',
		'classes': 'ew-minor'
	},
	{
		'title': 'Minute',
		'classes': 'ew-minute'
	},
	{
		'title': 'Minutte',
		'classes': 'ew-minuette'
	},
	{
		'title': 'Sub Minuette',
		'classes': 'ew-sub-minuette'
	},
	{
		'title': 'Micro',
		'classes': 'ew-micro'
	},
	{
		'title': 'Sub Micro',
		'classes': 'ew-sub-micro'
	},
	{
		'title': 'Einstieg',
		'classes': 'ew-entry'
	},
	{
		'title': 'Stopp',
		'classes': 'ew-stop'
	},
	{
		'title': 'Ziel',
		'classes': 'ew-target'
	},
	{
		'title': 'Tradegewinn',
		'classes': 'trading-profit'
	},
	{
		'title': 'Tradeverlust',
		'classes': 'trading-loss'
	},
	{
		'title': 'Wichtig',
		'classes': 'important'
	}
];

export default class Stock3ColorsList {
	constructor( enabledList ) {
		this._available = enabledList /* && enabledList.length */?
			styles.filter( _ => enabledList.includes( _.classes ) ) :
			styles;

		this._titleByClasses = this._available.reduce( ( acc, curr ) => {
			acc[ curr.classes ] = curr.title;
			return acc;
		}, {} );
	}

	getAvailable() {
		return this._available;
	}

	getTitleByClasses() {
		return this._titleByClasses;
	}
}
