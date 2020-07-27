import { connect } from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import {dispatchAction} from 'framework'

const mapStateToProps = state => {
	return {
		userRights: state.ucInfo.get('userRights'),
	}
}
const mapDispatchToProps = dispatch => {
	return dispatchAction(dispatch)
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
	}
}

const smart2 = (mapStateToProps)=>{
	return component => {
		return connect(
			mapStateToProps,
			mapDispatchToProps,
			mergeProps,
		)(WithImmutablePropsToJs(component))
	}
}

export default smart2
