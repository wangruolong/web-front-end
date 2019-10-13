import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'fish'
import authUtil from 'utils/authUtil'
class Index extends Component {

	componentDidMount(){
		let { query = {} } = this.props.location
		let { model} = query
		//1.处理sdp-app-id
		let sdpAppId = query['sdp-app-id'] || ''
		if(sdpAppId !==''){
			this.props.setGlobalData({field:'sdpAppId',value: sdpAppId})
		}
		//2.处理model
		//可以有多种显示样式，app是完整的包括登录退出功能，cmpt是组件模式只显除菜单之外的数据，未来可能还有什么自定义显示样式。
		if(!model){
			let existingModel = authUtil.getLocalStorage('model')
			if(!existingModel) {
				model = 'app'// 默认是app
			}else{
				model = existingModel
			}
		}
		this.props.setGlobalData({field:'model',value: model})
	}
	
	render() {
		let {loading={}} = this.props
		let {isLoading=false} = loading
    	return (<div>
    		<Spin spinning={isLoading} tip={'加载中...'} size="large">
    			{this.props.children}
    		</Spin>
		</div>)
	}
}
Index.propTypes={
	children: PropTypes.node,
	loading: PropTypes.object,
	location: PropTypes.object,
	setGlobalData: PropTypes.func
}
export default Index
