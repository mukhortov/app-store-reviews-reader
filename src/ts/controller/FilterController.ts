import DataModel from '../model/DataModel'
import { FilterKeys } from '../model/FilterKeys'

const toggleFilterValue = (model: DataModel, filterKey: string) => {
	if (model.filters[filterKey].value.includes(model.review[filterKey])) {
		model.filters[filterKey].value = model.filters[filterKey].value.filter(item => item !== model.review[filterKey])
	} else {
		model.filters[filterKey].value.push(model.review[filterKey])
	}
}

export default class FilterController {

	public filterLocale(event: Event, model: DataModel) {
		toggleFilterValue(model, FilterKeys.locale)
	}

	public filterRating(event: Event, model: DataModel) {
		toggleFilterValue(model, FilterKeys.rating)
	}

	public filterVersion(event: Event, model: DataModel) {
		toggleFilterValue(model, FilterKeys.version)
	}

	public clearVersionFilter(event: Event, model: DataModel) {
		model.filters.version.value = []
	}

	public clearRatingFilter(event: Event, model: DataModel) {
		model.filters.rating.value = []
	}

	public clearLocaleFilter(event: Event, model: DataModel) {
		model.filters.locale.value = []
	}

	public clearFilters(event: Event, model: DataModel) {
		model.filters.version.value = []
		model.filters.rating.value = []
		model.filters.locale.value = []
	}
}
