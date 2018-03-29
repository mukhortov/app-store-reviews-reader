import { Config } from '../config'
import AppInfo from '../model/AppInfo'
import { country } from '../model/Country'
import Review from '../model/Review'

export default class API {
	private static itunesUrl: string = Config.appStoreUrl
	private static imageSize: number = window.devicePixelRatio > 1 ? 2 : 0
	private static defaultAppId: string = Config.appId

	public static getReviews(locale: string, page: number) {
		return new Promise((resolve, reject) => {
			this.getJson('GET', this.generateUrl(locale, page)).then((json: any) => {
				if (json.feed && json.feed.entry && json.feed.link) {
					const appInfo = this.decodeAppInfo(json.feed.entry.shift())
					const reviews = json.feed.entry.map(this.decodeReview.bind(this, locale))
					const nextPage = this.decodeNextPage(json.feed.link)

					resolve({ appInfo, reviews, nextPage })
				} else {
					reject('JSON parse error')
				}
			}).catch(error => reject(error))
		})
	}

	private static getJson(method: string, url: string) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest()

			request.open(method, url, true)

			request.onload = () => {
				if (request.status >= 200 && request.status < 400) {
					const data: object = JSON.parse(request.responseText)
					resolve(data)
				} else {
					reject('Server returned an error')
				}
			}

			request.onerror = () => reject('Connection error')
			request.send()
		})
	}

	// ★★★★★
	private static setRating(rating: string): string {
		const maxRating = 5
		let stars = ''

		for (let i = +rating; i--;) {
			stars += '★'
		}

		while (stars.length < maxRating) {
			stars += '☆'
		}

		return stars
	}

	private static decodeAppInfo(json: any): AppInfo {
		return {
			name: json['im:name'].label,
			author: json['im:artist'].label,
			authorUrl: json['im:artist'].attributes.href,
			image: json['im:image'][this.imageSize].label,
			price: json['im:price'].label === 'Get' ? 'Free' : json['im:price'].label,
			appUrl: json.id.label,
		}
	}

	private static decodeReview(locale: string, json: any): Review {
		if (!json.author) {
			return null
		}

		return {
			id: json.id.label,
			title: json.title.label,
			author: json.author.name.label,
			content: json.content.label,
			rating: Number(json['im:rating'].label),
			starRating: this.setRating(json['im:rating'].label),
			version: json['im:version'].label,
			locale: locale,
			store: country[locale],
		}
	}

	private static decodeNextPage(json: any): number {
		for (const item of json) {
			if (item.attributes.rel === 'next') {
				return +('' + item.attributes.href.match(/page=\d+/)).replace(/\D/g, '') || null
			}
		}

		return null
	}

	private static generateUrl(locale: string, page: number): string {
		const id: string = window.location.hash ? window.location.hash.substring(1) : this.defaultAppId
		const pageString: string = page ? page.toString() : '1'

		return this.itunesUrl.replace('{locale}', locale || 'en').replace('{page}', pageString).replace('{id}', id)
	}

}
