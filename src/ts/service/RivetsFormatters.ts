import * as rivets from 'rivets'

export default class RivetsFormatters {

	public static init() {

		rivets.formatters.length = value => value.length || 0
		rivets.formatters.empty = arr => arr.length === 0
		rivets.formatters.first = arr => arr.shift()
		rivets.formatters.last = arr => arr.pop()
		rivets.formatters.sort = arr => arr.sort()
		rivets.formatters.and = (first, second) => first && second
		rivets.formatters.not = value => !value

		rivets.formatters.sortBy = (arr: any[], sortKey: any): any[] => {
			return arr.sort((a, b) => {
				const x = a[sortKey]
				const y = b[sortKey]
				return ((x < y) ? -1 : ((x > y) ? 1 : 0))
			})
		}

		rivets.formatters.filter = (arr: any[], filterKey: string, filterValue: any): any[] => {
			if (filterValue === null || filterValue.length === 0) {
				return arr
			}

			if (filterValue instanceof Array) {
				return arr.filter(item => filterValue.includes(item[filterKey]))
			}

			return arr.filter(item => item[filterKey] === filterValue)
		}

		rivets.formatters.unique = (arr: any[], filterKey: string): any[] => {
			const uniqueArr = []
			return arr.filter(item => {
				if (uniqueArr.includes(item[filterKey])) {
					return false
				}
				uniqueArr.push(item[filterKey])
				return true
			})
		}

		rivets.formatters.average = (arr: any[], filterKey: string): any[] => {
			return arr.reduce((accumulator, item) => accumulator + item[filterKey] / arr.length, 0).toFixed(2)
		}

		rivets.formatters.contains = (arr: any[], search: any): boolean => {
			if (arr.length > 0) {
				return arr.includes(search)
			}

			return false
		}

	}
}
