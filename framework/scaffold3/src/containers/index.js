import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import IndexDump from 'components'


const mapStateToProps = state => {
	return {
		loading: state.global.get('loading')
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

const IndexSmart = connect(
	mapStateToProps,
	mapDispatchToProps
)(WithImmutablePropsToJs(IndexDump))

export default IndexSmart