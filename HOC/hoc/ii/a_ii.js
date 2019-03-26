import React from 'react'
import ReactDOM from 'react-dom'

// Props Proxy demonstration

function IIHOC(WrappedComponent) {
    // return class II extends React.Component {
    return class II extends WrappedComponent {
        render() {
            return (<div style={{border: '2px solid red', padding: '0px 30px 30px 30px'}}>
                <h1>HOC Component</h1>
                <p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
                <p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
				<WrappedComponent {...this.props}/>
				{/* <WrappedComponent /> */}
            </div>)
        }
    }
}


class Example extends React.Component {
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

Example.defaultProps = {
    wrappedProps: 'dadabai'
}

// const EnhancedExample = Example
const EnhancedExample = IIHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toLocaleDateString()}/>, document.getElementById('root'))
