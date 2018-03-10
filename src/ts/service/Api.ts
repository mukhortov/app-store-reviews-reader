import { Config } from '../config'
import AppInfo from '../model/AppInfo'
import { country } from '../model/Country'
import Review from '../model/Review'

interface GetReviewsCallback {
	(reviews: [Review], appInfo: AppInfo, nextPage: number, error: any)
}

export default class API {
	private itunesUrl: string = Config.appStoreUrl
	private imageSize: number = window.devicePixelRatio > 1 ? 2 : 0
	private defaultAppId: string = Config.appId

	public getReviews(locale: string, page: number, callback: GetReviewsCallback) {
		this.getJson('GET', this.generateUrl(locale, page), (json, error) => {
			let appInfo: AppInfo = null
			let reviews: [Review] = null
			let nextPage: number = null

			if (!error && json.feed && json.feed.entry && json.feed.link) {
				appInfo = this.decodeAppInfo(json.feed.entry.shift())
				reviews = json.feed.entry.map(this.decodeReview.bind(this, locale))
				nextPage = this.decodeNextPage(json.feed.link)
			} else {
				error = error || 'JSON parse error'
			}

			callback(reviews, appInfo, nextPage, error)
		})
	}

	private getJson(method: string, url: string, callback: (json: any, error: any) => void) {
		const request = new XMLHttpRequest()

		request.open(method, url, true)

		request.onload = () => {
			if (request.status >= 200 && request.status < 400) {
				// Success
				const data = JSON.parse(request.responseText)
				callback(data, null)
			} else {
				// Server returns an error
				callback(null, 'Server returned an error')
			}
		}

		request.onerror = () => {
			// Connection error
			callback(null, 'Connection error')
		}

		request.send()
	}

	// ★★★★★
	private setRating(rating: string): string {
		const maxRating = 5
		let stars = ''

		for (let i = +rating; i--; ) {
			stars += '★'
		}

		while (stars.length < maxRating) {
			stars += '☆'
		}

		return stars
	}

	private decodeAppInfo(json: any): AppInfo {
		return {
			name:      json['im:name'].label,
			author:    json['im:artist'].label,
			authorUrl: json['im:artist'].attributes.href,
			image:     json['im:image'][this.imageSize].label,
			price:     json['im:price'].label === 'Get' ? 'Free' : json['im:price'].label,
			appUrl:    json.id.label,
		}
	}

	private decodeReview(locale: string, json: any): Review {
		if (!json.author) {
			return null
		}

		return {
			id:         json.id.label,
			title:      json.title.label,
			author: 	json.author.name.label,
			content:    json.content.label,
			rating:     Number(json['im:rating'].label),
			starRating: this.setRating(json['im:rating'].label),
			version:    json['im:version'].label,
			locale:     locale,
			store:      country[locale],
		}
	}

	private decodeNextPage(json: any): number {
		for (const item of json) {
			if (item.attributes.rel === 'next') {
				return +('' + item.attributes.href.match(/page=\d+/)).replace(/\D/g, '') || null
			}
		}

		return null
	}

	private generateUrl(locale: string, page: number): string {
		const id: string = window.location.hash ? window.location.hash.substring(1) : this.defaultAppId
		const pageString: string = page ? page.toString() : '1'

		return this.itunesUrl.replace('{locale}', locale || 'en').replace('{page}', pageString).replace('{id}', id)
	}

}
