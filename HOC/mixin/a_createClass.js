/**
 * Created by 大大白(150423) on 2017/9/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'

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
let CompA = React.createClass({
    mixins: [MixinA, MixinB],
    getDefaultProps: function () {
        return {
            cc: 'compa.props.cc',
            dd: 'compa.props.dd'
        }
    },
    getInitialState: function () {
        return {
            cc: 'compa.state.cc',
            dd: 'compa.state.dd'
        }
    },
    componentWillMount: function () {
        console.log('CompA---Component will mount');
    },
    componentDidMount: function () {
        console.log('CompA---Component did mount');
    },
    bb: function () {
        console.log('xxxxx')
    },
    render: function () {
        console.log('CompA---Component props', this.props)
        console.log('CompA---Component state', this.state)
        this.aa()
        return (
            <div>
                react mixins使用演示
            </div>
        )
    }
})

ReactDOM.render(<CompA />, document.getElementById('root'))
