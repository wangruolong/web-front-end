import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import IndexDump from 'components'
import {setGlobalData} from 'actions/globalAction'


const mapStateToProps = state => {
	return {
		loading: state.global.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setGlobalData:(args)=>{
			dispatch(setGlobalData(args))
		}
	}
}

const IndexSmart = connect(
	mapStateToProps,
	mapDispatchToProps
)(WithImmutablePropsToJs(IndexDump))

export default IndexSmart