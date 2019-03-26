import React from 'react'
import ReactDOM from 'react-dom'

// Props Proxy with ref demonstration

function PPHOC(WrappedComponent) {
    return class PP extends React.Component {
        constructor(props) {
            super(props)
            this.state = {name: ''}
            this.getInstanceName = this.getInstanceName.bind(this)
        }

        getInstanceName(instance) {
            if (instance.instanceName !== this.state.name)
                this.setState({name: instance.instanceName})
        }

        render() {
            const props = Object.assign({}, this.props, {
                ref: this.getInstanceName
            })
            return (
                <div style={{border: '2px solid red', padding: '0px 30px 30px 30px'}}>
                    <h1>HOC Component</h1>
                    <p><b>This:</b><i></i></p>
                    <p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
                    <p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
                    <WrappedComponent {...props}/>
                </div>
            )
        }
    }
}


class Example extends React.Component {
    constructor(props) {
        super(props)
        this.instanceName = 'han solo'
    }

    render() {
        return (
            <div style={{border: '2px solid blue'}}>
                <h2>Wrapped Component</h2>
                <p><b>This:</b><i>{JSON.stringify({'instanceName': this.instanceName})}</i></p>
                <p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
                <p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
            </div>
        )
    }
}
// const EnhancedExample = Example
const EnhancedExample = PPHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toLocaleDateString()}/>, document.getElementById('root'))
