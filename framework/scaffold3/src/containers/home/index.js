import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import HomeDump from 'components/home'
import {setUcInfo} from 'actions/ucAction'


const mapStateToProps = state => {
	return {
		checkAuth: state.ucInfo.get('checkAuth')
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setUcInfo:(args)=>{
			dispatch(setUcInfo(args))
		}
	}
}

const HomeSmart = connect(
	mapStateToProps,
	mapDispatchToProps
)(WithImmutablePropsToJs(HomeDump))

export default HomeSmart