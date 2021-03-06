import * as rivets from 'rivets'
import { country } from './model/Country'
import { dataModel } from './model/DataModel'
import API from './service/Api'
import RivetsFormatters from './service/RivetsFormatters'

RivetsFormatters.init()

const container: HTMLElement = document.querySelector('#container')
rivets.bind(container, dataModel)

function fetchReviews(locale: string, page: number) {
	API.getReviews(locale, page).then(({ appInfo, reviews, nextPage }) => {
		dataModel.reviews = dataModel.reviews.concat(reviews)

		if (country.us === country[locale]) {
			dataModel.appInfo = appInfo
		}

		if (nextPage && nextPage > page) {
			fetchReviews(locale, nextPage)
		}
	}).catch()
}

for (const key in country) {
	if (country.hasOwnProperty(key)) {
		const firstPage: number = 1
		fetchReviews(key, firstPage)
	}
}
