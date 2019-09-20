import fetch from 'isomorphic-fetch'
import authUtils from '../utils/authUtil'
import {Message} from '../components/uiCom'

export default class baseService {

	appRequest({endpoint, body, method = 'get', withAuthToken = true}) {
		let apiUrl = `${ORIGINS.APP_HOST}/${endpoint}`
		return this.request({apiUrl, body, method, withAuthToken})
	}

	request({apiUrl, body, method = 'get', withAuthToken = true, host = null, isBase64Encoding = true}) {
		const _method = method.toUpperCase()
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=UTF-8'
		}
		let sdpAppId = authUtils.getLocalStorage('sdp-app-id') || ''
		if(sdpAppId!==''){
			headers['sdp-app-id']=sdpAppId
		}else{//如果获取不到sdp-app-id则从配置文件里面读取
			headers['sdp-app-id']=`${ORIGINS.SDP_APP_ID}`
		}

		if (withAuthToken) {
			headers['Authorization'] = authUtils.getAuthHeader({
				url: apiUrl,
				method: _method,
				host,
				isBase64Encoding
			})
			//debug模式
			// headers['Authorization'] = 'DEBUG userid=121005,realm=oh'
		}

		let settings = {
			method: _method,
			headers
		}
		if (!['GET', 'HEAD'].includes(_method) && body) {
			switch (typeof body) {
				case 'object':
					settings['body'] = JSON.stringify(body)
					break
				case 'string':
					settings['body'] = body
					break
			}

		}

		return fetch(apiUrl, settings).then(
			response => {
				let json = response.json()
				return json.then(json => {
					return {json, response}
				}).then(({json, response}) => {
					if (!response.ok) {
						return Promise.reject(json)
					}
					return json
				}).catch(e => {
					if (response.ok) {
						return response.redirected ? {url: response.url} : {}
					} else {
						Message.info(e.message)
						return Promise.reject(e)
					}
				})
			}
		).catch(err => {
			if(err.message === 'Failed to fetch') {
				Message.info('发送请求失败，请检查网络设置')
			}
			throw err
		})
	}

}
