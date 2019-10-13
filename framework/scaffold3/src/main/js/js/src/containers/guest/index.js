import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import GuestDump from 'components/guest'


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


const GuestSmart = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WithImmutablePropsToJs(GuestDump))

export default GuestSmart