export default interface Filters {
	locale: Filter
	version: Filter
	rating: Filter
}

export interface Filter {
	key: string
	value: string[]
}
