/**
 * Created by 大大白(150423) on 2017/9/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMixin from 'react-mixin'

let MixinA = {
    getDefaultProps: function () {
        return {
            aa: 'MixinA.props.aa',
            bb: 'MixinA.props.bb'
        }
    },
    getInitialState: function () {
        return {
            aa: 'MixinA.state.aa',
            bb: 'MixinA.state.bb'
        }
    },
    componentWillMount: function () {
        console.log('MixinA---Component will mount');
    },
    componentDidMount: function () {
        console.log('MixinA---Component did mount');
    },
    aa: function () {
        this.bb()
    }
}
let MixinB = {
    componentWillMount: function () {
        console.log('MixinB---Component will mount');
    },
    componentDidMount: function () {
        console.log('MixinB---Component did mount');
    }
}

class CompA extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cc: 'compa.state.cc',
            dd: 'compa.state.dd'
        }
    }
    componentWillMount() {
        console.log('CompA---Component will mount');
    }
    componentDidMount() {
        console.log('CompA---Component did mount');
    }
    bb() {
        console.log('At CompA dispatch function aa of MixinA and at MixinA dispatch function bb of CompA.')
    }
    render() {
        console.log('CompA---Component props', this.props)
        console.log('CompA---Component state', this.state)
        this.aa()
        return (
            <div>
                react mixins使用演示
            </div>
        )
    }
}
CompA.defaultProps = {
    cc: 'compa.props.cc',
    dd: 'compa.props.dd'
}
ReactMixin.onClass(CompA, MixinA)
ReactMixin.onClass(CompA, MixinB)


ReactDOM.render(<CompA />, document.getElementById('root'))
