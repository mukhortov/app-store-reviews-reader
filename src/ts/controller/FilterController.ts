import DataModel from '../model/DataModel'

const toggleFilterValue = (model: DataModel, name: string) => {
	if (model.filters[name].value.includes(model.review[name])) {
		model.filters[name].value = model.filters[name].value.filter(item => item !== model.review[name])
	} else {
		model.filters[name].value.push(model.review[name])
	}
}

export default class FilterController {

	public filterLocale(event: Event, model: DataModel) {
		toggleFilterValue(model, 'locale')
	}

	public filterRating(event: Event, model: DataModel) {
		toggleFilterValue(model, 'rating')
	}

	public filterVersion(event: Event, model: DataModel) {
		toggleFilterValue(model, 'version')
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
