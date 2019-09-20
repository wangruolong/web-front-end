import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import LoginDump from 'components/login'
import {login, getIdentifyCode } from 'actions/ucAction'


const mapStateToProps = state => {
	return {
		identifyCodePath: state.ucInfo.get('identifyCodePath')
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (args) => {
			dispatch(login(args))
		},
		getIdentifyCode: (args) => {
			dispatch(getIdentifyCode(args))
		}
	}
}

const LoginSmart = connect(
	mapStateToProps,
	mapDispatchToProps
)(WithImmutablePropsToJs(LoginDump))

export default LoginSmart