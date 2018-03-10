import FilterController from '../controller/FilterController'

export let dataModel = {
	appInfo: {},
	reviews: [],
	filters: {
		locale: {
			key: 'locale',
			value: ['us'],
		},
		version: {
			key: 'version',
			value: [],
		},
		rating: {
			key: 'rating',
			value: [],
		},
	},
	controller: new FilterController(),
}
