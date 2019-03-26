/**
 * Created by 大大白(150423) on 2017/9/18.
 */
import React from 'react'
import ReactDOM from 'react-dom'

function PPHOC(WrappedComponent) {
    return class PP extends React.Component {
        render() {
            return (
                <div style={{border: '2px solid red', padding: '0px 30px 30px 30px'}}>
                    <h1>HOC Component</h1>
                    <p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
                    <p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
                    <WrappedComponent {...this.props}/>
                </div>
            )
        }
    }
}
class Example extends React.Component {
    render() {
        return (<div style={{border: '2px solid blue'}}>
            <h2>Wrapped Component</h2>
            <p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
            <p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
        </div>)
    }
}


const EnhancedExample = PPHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toLocaleDateString()}/>, document.getElementById('root'))