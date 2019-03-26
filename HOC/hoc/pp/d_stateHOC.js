/**
 * Created by 大大白(150423) on 2017/9/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {IIHOC as DebuggerHOC, stringify} from '../ii/ii_debug'


// Props Proxy and state abstraction demonstration
function PPHOC(WrappedComponent) {
    return class PP extends React.Component {
        constructor(props) {
            super(props)
            this.state = {fields: {}}
        }

        getField(fieldName) {
            if (!this.state.fields[fieldName]) {
                this.state.fields[fieldName] = {
                    value: '',
                    onChange: event => {
                        this.state.fields[fieldName].value = event.target.value
                        this.forceUpdate()
                    }
                }
            }
            return {
                value: this.state.fields[fieldName].value,
                onChange: this.state.fields[fieldName].onChange
            }
        }

        render() {
            const props = Object.assign({}, this.props, {
                fields: this.getField.bind(this),
            })
            return (
                <div style={{border: '2px solid red', padding: '0px 30px 30px 30px'}}>
                    <h1>HOC Component</h1>
                    <p><b>Props:</b><i>{stringify(this.props)}</i></p>
                    <p><b>State:</b><i>{stringify(this.state)}</i></p>
                    <WrappedComponent {...props}/>
                </div>
            )
        }
    }
}


class Example extends React.Component {
    render() {
        return (
            <div style={{border: '2px solid blue'}}>
                <h2>Wrapped Component</h2>
                <p><b>Props:</b><i>{stringify(this.props)}</i></p>
                <p><b>State:</b><i>{stringify(this.state)}</i></p>
                <input {...this.props.fields('email1')}/>
                <br />
                <input {...this.props.fields('email2')}/>
                <br />
                <input {...this.props.fields('email3')}/>
                <br />
                <input {...this.props.fields('email4')}/>
                <br />
            </div>
        )
    }
}
const EnhancedExample = PPHOC(Example)
// 使用高阶组件作为调试器，来调试被包装组件的状态。
// const EnhancedExample = DebuggerHOC(PPHOC(Example))

ReactDOM.render(<EnhancedExample date={(new Date).toLocaleDateString()}/>, document.getElementById('root'))
