import BaseService from './baseService'

export default new class AppService extends BaseService {
	getDataList(args){
		const endpoint = `/v1.0/data_list`
		return this.appRequest({
			endpoint,
			method: 'GET'
		})
	}
}
