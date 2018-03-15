import FilterController from '../controller/FilterController'
import AppInfo from './AppInfo'
import Filters from './Filters'
import Review from './Review'

export default interface DataModel {
	appInfo: AppInfo
	reviews: Review[]
	review: Review
	filters: Filters
	controller: FilterController
}

export let dataModel: DataModel = {
	appInfo: null,
	reviews: [],
	review: null,
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
