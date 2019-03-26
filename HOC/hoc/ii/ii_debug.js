import React from 'react'
import ReactDOM from 'react-dom'

function replacer(key, value) {
    if (typeof value === 'function') {
        return `function ${value.name}() {...}`
    }

    return value
}

export function stringify(value) {
    return JSON.stringify(value, replacer, 2)
}

// II debug example
// We are using the Inheritance Inversion technique to display
// the current state and props of the WrappedComponent (the component you want to debug).
// This is based on the technique that Mickael Jackson and Ryan Florence recommend
export function IIHOC(WrappedComponent) {
    return class II extends WrappedComponent {
        render() {
            return (
                <div style={{border: '2px solid red', padding: '0px 30px 30px 30px'}}>
                    <h1>HOC Debugger Component</h1>
                    <p><b>Props:</b><i>{stringify(this.props)}</i></p>
                    <p><b>State:</b><i>{stringify(this.state)}</i></p>
                    {super.render()}
                </div>
            )
        }
    }
}
class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'fran',
            email: 'franleplant@gmail.com'
        }
    }
    render() {
        return (
            <div style={{border: '2px solid blue'}}>
                <h2>Wrapped Component</h2>
                <p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
                <p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
            </div>
        )
    }
}

const EnhancedExample = IIHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toLocaleDateString()} callback={function test() {
}}/>, document.getElementById('root'))
