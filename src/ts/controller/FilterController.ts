export default class FilterController {

	public filterLocale(event, model) {
		if (model.filters.locale.value.includes(model.review.locale)) {
			model.filters.locale.value = model.filters.locale.value.filter(item => item !== model.review.locale)
		} else {
			model.filters.locale.value.push(model.review.locale)
		}
	}

	public filterRating(event, model) {
		if (model.filters.rating.value.includes(model.review.rating)) {
			model.filters.rating.value = model.filters.rating.value.filter(item => item !== model.review.rating)
		} else {
			model.filters.rating.value.push(model.review.rating)
		}
	}

	public filterVersion(event, model) {
		if (model.filters.version.value.includes(model.review.version)) {
			model.filters.version.value = model.filters.version.value.filter(item => item !== model.review.version)
		} else {
			model.filters.version.value.push(model.review.version)
		}
	}

	public clearVersionFilter(event, model) {
		model.filters.version.value = []
	}

	public clearRatingFilter(event, model) {
		model.filters.rating.value = []
	}

	public clearLocaleFilter(event, model) {
		model.filters.locale.value = []
	}

	public clearFilters(event, model) {
		model.filters.version.value = []
		model.filters.rating.value = []
		model.filters.locale.value = []
	}

	// TODO: Private methods are not available inside the class
	private toggleFilterValue(filter, value) {
		if (filter.includes(value)) {
			filter = filter.filter(item => item !== value)
		} else {
			filter.push(value)
		}
	}
}
