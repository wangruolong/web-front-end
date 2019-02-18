import React from 'react'
// import styles from "styles/demoComponent/example1.css";
import styles from 'styles/demoComponent/example1scss.scss'

function PPHOC(WrappedComponent) {
	return class PP extends React.Component {
		render() {
			return (
				<div className={styles.parent}>
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
		//变量引用
		var name = 'Guy Fieri'
		var place = 'Flavortown'
		//es6 map方法
		let result = [1, 2, 3].map(n => n ** 2)
		//es6 数组赋值
		var [a, , b] = [1, 2, 3]
		//es6 默认变量名称
		let shorthand=1
		var obj = {
			shorthand,
			method() {
				return '😀'
			}
		}
		console.log(obj)
		return (<div className={styles.child}>
			<h2>Wrapped Component</h2>
			<p><b>Props:</b><i>{JSON.stringify(this.props)}</i></p>
			<p><b>State:</b><i>{JSON.stringify(this.state)}</i></p>
			<p>Hello {name}, ready for {place}?</p>
			<p>{result}</p>
			<p>数组赋值{a}{b}</p>
		</div>)
	}
}

const EnhancedExample = PPHOC(Example)

export default EnhancedExample