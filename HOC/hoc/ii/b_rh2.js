/**
 * Created by 大大白(150423) on 2017/9/19.
 */
import React from 'react'
import ReactDOM from 'react-dom'

function iiHOC(WrappedComponent) {
	// return class Enhancer extends React.Component {
    return class Enhancer extends WrappedComponent {
		// componentWillMount(){
			
		// }
        render() {
            const elementsTree = super.render()
            // const newComponent = new WrappedComponent()
            // const elementsTree = newComponent.render()
            let newProps = {};
            if (elementsTree && elementsTree.type === 'input') {
                newProps = {value: 'may the force be with you'}
            }
            const props = Object.assign({}, elementsTree.props, newProps)
            const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children)
            return newElementsTree
        }
    }
}

class Example extends React.Component {
    render() {
        return (<input ></input>)
    }
}
// const EnhancedExample = Example
const EnhancedExample = iiHOC(Example)

ReactDOM.render(<EnhancedExample date={(new Date).toLocaleDateString()}/>, document.getElementById('root'))
