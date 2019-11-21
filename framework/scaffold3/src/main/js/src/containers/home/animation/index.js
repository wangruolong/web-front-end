import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import Dump from 'components/home/animation'


const mapStateToProps = state => {
	return {
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) =>{
	return {
		...stateProps,
		...dispatchProps,
		...ownProps
	}
}


const Smart = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WithImmutablePropsToJs(Dump))

export default Smart