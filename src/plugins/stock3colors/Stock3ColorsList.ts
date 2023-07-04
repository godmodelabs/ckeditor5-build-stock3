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
] as const;

type Stock3Style = typeof styles[number];

export default class Stock3ColorsList {
	private available: ReadonlyArray<Stock3Style>;

	private titleByClasses: Record<string, string>;

	constructor( enabledList?: Array<string> ) {
		this.available = enabledList ?
			styles.filter( _ => enabledList.includes( _.classes ) ) :
			styles;

		this.titleByClasses = this.available.reduce( ( acc, curr ) => {
			acc[ curr.classes ] = curr.title;
			return acc;
		}, {} as Record<string, string> );
	}

	public getAvailable(): ReadonlyArray<Stock3Style> {
		return this.available;
	}

	public getTitleByClasses(): Record<string, string> {
		return this.titleByClasses;
	}
}
