//import Crypto from 'crypto-js';
import HmacSHA256 from 'crypto-js/hmac-sha256'
import Base64 from 'crypto-js/enc-base64'
//import {'hmac-sha256' as HmacSHA256, 'enc-base64' as Base64 } from 'crypto-js.hmac-sha256';

export default {
	getAuthHeader({ url, accessToken, macKey, host=null, method='get', isBase64Encoding }) {
		//URI转码

		const getEncodingUrl = url => {
			let index = url.lastIndexOf('?')
			let path = index > -1 ? url.substr(0, index) : url
			let query = index > -1 ? url.substr(index) : ''
			return encodeURI(path) + query
		}

		url = isBase64Encoding ? encodeURI(url) : getEncodingUrl(url) // 查询条件是基于base64编码，直接对整个url进行encode；否则只对url中的path进行encode

		/**
         * @return {Promise}
         */
		// let localToken = {}
		if(localStorage.token) {
			//try
			//{
			//    localToken = JSON.parse(localStorage.token);
			//}catch(e){
			//    localStorage.removeItem('token');
			//}
		}
		
		let _accessToken = accessToken || localStorage.access_token
		let _macKey = macKey || localStorage.mac_key

		if (!_accessToken || !_macKey) {
			return null
		}

		if (!HmacSHA256) {
			console.error('please include crypto lib in the page.')
		}

		let strAuth = `MAC id="${_accessToken}",nonce="`
		let nonce = new Date().getTime() + ':' + this.randomCode()
		strAuth += nonce + '",mac="'

		let path
		let pos = url.indexOf('://')
		if (pos > 0) {// for cross domain requesting
			path = url.substring(pos + 3)
			pos = path.indexOf('/')
			host = path.substr(0, pos)
			path = path.substring(pos)
		} else {
			if(!host) {
				console.error('parameter "host" is missed.')
				return null
			}
			path = url
		}
		let requestContent = nonce + '\n' + method.toUpperCase()  + '\n' + path + '\n' + host + '\n'
		let hash = HmacSHA256(requestContent, _macKey)
		let mac = hash.toString(Base64)
		strAuth += mac + '"'
		return strAuth

	},

	randomCode() {
		let code = ''
		let codeLength = 8//验证码的长度
		let chars = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
		//所有候选组成验证码的字符，当然也可以用中文的

		for (let i = 0; i < codeLength; i++) {
			let charIndex = Math.floor(Math.random() * 36)
			code += chars[charIndex]
		}
		return code
	},
	saveAuth(accessToken, expiresAt, macAlgorithm, macKey, refreshToken, serverTime, userInfo={}) {
		localStorage.access_token = accessToken
		localStorage.expires_at = expiresAt
		localStorage.mac_algorithm = macAlgorithm
		localStorage.mac_key = macKey
		localStorage.refresh_token = refreshToken
		localStorage.server_time = serverTime
		localStorage.user_info = JSON.stringify(userInfo)
	},
	getAuth() {
		return {
			userInfo : localStorage.user_info ? JSON.parse(localStorage.user_info) : null,
			accessToken : localStorage.access_token || null,
			expiresAt : localStorage.expires_at || null,
			macAlgorithm : localStorage.mac_algorithm || null,
			macKey : localStorage.mac_key || null,
			refreshToken: localStorage.refresh_token || null,
			serverTime: localStorage.server_time || null
		}
	},
	cleanAuth() {
		delete localStorage.access_token
		delete localStorage.expires_at
		delete localStorage.mac_algorithm
		delete localStorage.mac_key
		delete localStorage.refresh_token
		delete localStorage.server_time
		delete localStorage.user_info
	},
	setLocalStorage(key,value){
		localStorage[key]=value
	},
	getLocalStorage(key){
		return localStorage[key]
	}
}
