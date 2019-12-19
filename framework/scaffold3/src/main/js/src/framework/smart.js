import { connect } from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'

const mapStateToProps = state => {
	return {
		userRights: state.ucInfo.get('userRights'),
	}
}
const mapDispatchToProps = dispatch => {
	return {}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return {
		...stateProps,
		...dispatchProps,
		...ownProps,
	}
}

const smart = component => {
	return connect(
		mapStateToProps,
		mapDispatchToProps,
		mergeProps,
	)(WithImmutablePropsToJs(component))
}

export default smart
