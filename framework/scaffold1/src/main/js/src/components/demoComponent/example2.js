import React,{Component} from 'react'
import PropsType from 'prop-types'
export default class Example2 extends Component{
	constructor(props){
		super(props)
		this.state={
			data:['a','b','c','d'],//1.为什么需要加key2.为什么不能用idx作为key
			// data:[{val:'a',id:'1'},{val:'b',id:'2'},{val:'c',id:'3'},{val:'d',id:'4'}]//3.要用id作为key
			// inputValue:'输入框的默认值'
		}
	}
    handleChange = () => {
    	this.setState({
    		data:['d','c','b','a'],
    		// data:[{val:'d',id:'4'},{val:'c',id:'3'},{val:'b',id:'2'},{val:'a',id:'1'}],
    		// inputValue:'改变输入框的值'
    	})
    }
   
    // 上面实例中在数组重新排序后，key对应的实例都没有销毁，而是重新更新。具体更新过程我们拿key=0的元素来说明， 数组重新排序后：
    // 1. 组件重新render得到新的虚拟dom；
    // 2. 新老两个虚拟dom进行diff，新老版的都有key=0的组件，react认为同一个组件，则只可能更新组件；
    // 3. 然后比较其children
    // 3.1 文本组件是受控组件，值变化了，重新render，重新赋值。
    // 3.2 input组件是非受控组件，由于父组件重新render了所以自己也重新render，但是并没有重新赋值。
    // 只要父级重新渲染时，这两个生命周期函数就会重新调用，不管 props 有没有变化。
    // 不能在这里把受控转成非受控，否则受控很有可能会被截断。导致无效。
    // 不能在willReceive里面setState，这样受控组件本来由单一源控制，变成受多个源控制。
    render(){
    	return <div>
    		{/* 1.为什么需要加key */}
    		{/* <div>
    			{this.state.data[0]=='a'?<Text1 key={1}  />:<Text2 key={2}  />}
    			{this.state.data[0]=='d'?<Text1 key={1} />:<Text2 key={2} />}
    		</div> */}
			
    		{/* 2.为什么不能用idx作为key */}
    		{this.state.data.map((item,idx) => <Item key={idx} parentValue={item}/>)}
			
    		{/* 3.要用id作为key */}
    		{/* {this.state.data.map((item,idx) => <Item key={item.id} parentValue={item.val}/>)} */}
    		<button onClick={this.handleChange}>改变state</button>
    	</div>
    }
}

class Text1 extends Component{
	componentWillUnmount(){
		console.log('Text1','willUnmount')
	}
	render(){
		console.log('Text1','render')
		return this.props.value ||''
	}
	static propTypes = {
		value: PropsType.string
	}
}
class Text2 extends Component{
	componentWillUnmount(){
		console.log('Text2','willUnmount')
	}
	render(){
		console.log('Text2','render')
		return this.props.value ||''
	}
	static propTypes = {
		value: PropsType.string
	}
}

class Item extends Component{
	constructor(props){
    	super(props)
    	this.state = {
			childValue:'',
			itemValue: props.inputValue
    	}
	}
    
	// componentWillReceiveProps(newProps){
	// 	console.log('item will receive this.props',this.props)
	// 	console.log('item will receive newProps',newProps)
	// 	if(newProps.inputValue!=this.props.inputValue){
	// 		this.setState({
	// 			itemValue:newProps.inputValue
	// 		})
	// 	}
	// }
    onChange = (e) => {
    	this.setState({
    		itemValue: e.target.value
    	})
    }
    render(){
    	return <li>{this.props.parentValue}
    		<Input itemValue={this.state.itemValue} onChange={this.onChange}/>
    	</li>
    }

    static propTypes = {
    	parentValue: PropsType.string,
    	inputValue: PropsType.string
    }
}

class Input extends Component {
	// componentWillReceiveProps(newProps){
	// 	console.log('Input will receive ',newProps)
	// }
	render(){
		return <input type="text" value={this.props.itemValue} onChange={this.props.onChange}/>
	} 
    static propTypes = {
    	itemValue: PropsType.string,
    	onChange: PropsType.func
    }
}