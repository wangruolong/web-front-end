import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Smart2} from 'framework'

@Smart2((state)=>{
	return {
		dataList1: state.test1.get('dataList1'),
		dataList2: state.test2.get('dataList2'),
	}
})
class Test extends Component{
	constructor(props) {
		super(props)
	}
	componentDidMount(){
		this.props.test1.getDataList1([1,2,3]) 
		this.props.test2.getDataList2([1,2,3]) 
	}
	render(){
		const {dataList1,dataList2} = this.props
		return<div>
			{dataList1.map((v,i) => <div key={`dataList1-${i}`}>{v}</div>)}
			<br />
			{dataList2.map((v,i) => <div key={`dataList2-${i}`}>{v}</div>)}
			<br />
		</div>
	}
}
export default Test

Test.propTypes = {
	test1: PropTypes.object,
	test2: PropTypes.object,
	dataList1: PropTypes.array,
	dataList2: PropTypes.array
}
