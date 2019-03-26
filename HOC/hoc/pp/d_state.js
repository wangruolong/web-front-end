import React from 'react'
import ReactDOM from 'react-dom'
import {stringify} from '../ii/ii_debug'

class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email1: '',
            email2: '',
            email3: '',
            email4: ''
        }
        this.onChange1 = this.onInputChange1.bind(this)
        this.onChange2 = this.onInputChange2.bind(this)
        this.onChange3 = this.onInputChange3.bind(this)
        this.onChange4 = this.onInputChange4.bind(this)
    }

    onInputChange1(e) {
        this.setState({
            email1: e.target.value
        })
    }

    onInputChange2(e) {
        this.setState({
            email2: e.target.value
        })
    }

    onInputChange3(e) {
        this.setState({
            email3: e.target.value
        })
    }

    onInputChange4(e) {
        this.setState({
            email4: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h2>
                    Wrapped Component
                </h2>
                <p>
                    state
                </p>
                <pre>{stringify(this.state)}</pre>
                <form>
                    <input onChange={this.onChange1}/>
                    <br />
                    <input onChange={this.onChange2}/>
                    <br />
                    <input onChange={this.onChange3}/>
                    <br />
                    <input onChange={this.onChange4}/>
                </form>
            </div>
        )
    }
}

const EnhancedExample = Example

ReactDOM.render(<EnhancedExample />, document.getElementById('root'))
