import React,{Component} from 'react'
import styles from './style.scss'

export default class Welcome extends Component{
	render(){
		return <div className={styles['app-header']}>
			<img className={styles['app-logo']} />
			<p>Welcome to Baymax!</p>
		</div>
	}
}