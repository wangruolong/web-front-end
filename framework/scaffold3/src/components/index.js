import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Spin, Alert } from 'fish'


class Index extends Component {
	
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
	loading: PropTypes.object
}
export default Index
