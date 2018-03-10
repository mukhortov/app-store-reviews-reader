import * as rivets from 'rivets'
import AppInfo from './model/AppInfo'
import { country } from './model/Country'
import { dataModel } from './model/DataModel'
import Review from './model/Review'
import API from './service/Api'
import RivetsFormatters from './service/RivetsFormatters'

const api = new API()
const rivetsFormatters = new RivetsFormatters()

rivetsFormatters.init()

rivets.bind(document.querySelector('#container'), dataModel)

function fetchReviews(locale: string, page: number) {
	api.getReviews(locale, page, (reviews, appInfo, nextPage, error) => {
		if (error) {
			console.log('[Main: fetchReviews] error: ', error)
			return
		}

		dataModel.reviews = dataModel.reviews.concat(reviews)

		if (country.us === country[locale]) {
			dataModel.appInfo = appInfo
		}

		if (nextPage && nextPage > page) {
			fetchReviews(locale, nextPage)
		}
	})
}

for (const key in country) {
	if (country.hasOwnProperty(key)) {
		const firstPage: number = 1
		fetchReviews(key, firstPage)
	}
}
