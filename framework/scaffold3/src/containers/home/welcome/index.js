import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import WelcomeDump from 'components/home/welcome'


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


const WelcomeSmart = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WithImmutablePropsToJs(WelcomeDump))

export default WelcomeSmart