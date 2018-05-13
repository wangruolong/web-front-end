import React from 'react'
import { render } from 'react-dom'

let Root = React.createClass({
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
            </div>
        )
    }
})
render(
    <Root store={store} />,
    document.getElementById('root')
)
