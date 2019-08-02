import {connect} from 'react-redux'
import WithImmutablePropsToJs from 'with-immutable-props-to-js'
import IndexDump from 'components'


const mapStateToProps = state => {
	return {
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