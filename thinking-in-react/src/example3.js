import React,{Component} from 'react'
import PropsType from 'prop-types'

/************************************************************* 引入问题 ******************************************************************************************/
// export default class Example3 extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			data:['a','b','c','d']
// 		}
// 	}
//     handleChange = () => {
//     	this.setState({ data:['d','c','b','a'] })
//     }
//     render(){
//     	return(<div>
//     		{
//     			this.state.data.map((value,index) =>{
//     				return(<div key={index}>
//     					{value}：<input />
//     				</div>)
//     			})
//     		} 
//     		<button onClick={this.handleChange}>改变state</button>
//     	</div>)
//     }
// }

/*************************************************************** 分析问题-非受控 **************************************************************************************/
// 1、不加key的情况下，react分不清哪个是哪个。
// 2、React在循环的时候自动帮元素加上序号。
// 3、diff算法的比较规则，优先比较key，如果key不存在则比较组件名称，如果组件名称一样则react认为是同一个组件不unmount直接重新render。至于props里面的数据如果不一样，reactR认为这只是props数据变化了而已。
// export default class Example3 extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			data:[
// 				// 如果不加key，react会自动给你加上顺序的key。
// 				// <Text1 p='1'/>,
// 				// <Text1 p='2'/>,
// 				// <Text1 p='3'/>,
// 				// <Text1 p='4'/>
// 				// 加上key，告诉react对应的组件是哪一个。
// 				<Text1 key='1' p='1'/>,
// 				<Text1 key='2' p='2'/>,
// 				<Text1 key='3' p='3'/>,
// 				<Text1 key='4' p='4'/>
// 			]
// 		}
// 	}
//     handleChange = () => {
//     	this.setState({
//     		data:[
//     			// 如果不加key，react会自动给你加上顺序的key。
//     			// <Text1 p='4'/>,
//     			// <Text1 p='3'/>,
//     			// <Text1 p='2'/>,
//     			// <Text1 p='1'/>
//     			// 加上key，告诉react对应的组件是哪一个。
//     			<Text1 key='4' p='4'/>,
//     			<Text1 key='3' p='3'/>,
//     			<Text1 key='2' p='2'/>,
//     			<Text1 key='1' p='1'/>,
//     		],
//     	})
//     }
//     render(){
//     	return (<div>
//     		<div>
//     			{
//     				this.state.data.map((item) =>{
//     					return item
//     				})
//     			}
//     		</div>
//     		<button onClick={this.handleChange}>改变state</button>
//     	</div>)
//     }
// }

// class Text1 extends Component{
// 	constructor(){
// 		super()
// 		this.state={
// 			value:''
// 		}
// 	}
// 	handleOnChange = (e) => {
// 		this.setState({
// 			value:e.target.value
// 		})
// 	}
// 	UNSAFE_componentWillReceiveProps(props){
// 		console.log('Text1','willReceive',props)
// 	}
// 	componentWillUnmount(){
// 		console.log('Text1','xxxxxxxxxx willUnmount xxxxxxxxxx')
// 	}
	
// 	render(){
// 		console.log('Text1','render')
// 		return <div>
// 			Text{this.props.p}：<input value={this.state.value} onChange={this.handleOnChange} />
// 		</div>
// 	}
// }

/***************************************************************** 分析问题-受控 **************************************************************************************/
// 1、不加key的情况下，react会默认加上key，当对比到同一个key的组件名称不一致，就直接销毁掉了。
// 2、加key后，react会根据key进行比较，同一个key如果组件名称也一样，则认为是同一个组件不unmount，而是重新render。
// export default class Example3 extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			data:[
// 				// 不加key，react会自动加上key
// 				// <Text1  value={1}/>,
// 				// <Text2  value={2}/>,
// 				// <Text3  value={3}/>,
// 				// <Text4  value={4}/>
// 				// 加上key后，react可以找到key相等的组件进行比较
// 				<Text1 key={1} value={1}/>,
// 				<Text2 key={2} value={2}/>,
// 				<Text3 key={3} value={3}/>,
// 				<Text4 key={4} value={4}/>
// 			]
// 		}
// 	}
//     handleChange = () => {
//     	this.setState({
//     		data:[
//     			// 不加key，react会自动加上key
//     			// <Text4 value={4}/>,
//     			// <Text3 value={3}/>,
//     			// <Text2 value={2}/>,
//     			// <Text1 value={1}/>
//     			// 加上key后，react可以找到key相等的组件进行比较
//     			<Text4 key={4} value={4}/>,
//     			<Text3 key={3} value={3}/>,
//     			<Text2 key={2} value={2}/>,
//     			<Text1 key={1} value={1}/>
//     		],
    	
//     	})
//     }
	
//     render(){
//     	return (<div>
//     		<div>
//     			{
//     				this.state.data.map((item) =>{
//     					return item
//     				})
//     			}
//     		</div>
//     		<button onClick={this.handleChange}>改变state</button>
//     	</div>)
//     }
// }

// class Text1 extends Component{
// 	componentDidMount(){
// 		console.log('Text1','++++++++++ componentDidMount ++++++++++')
// 	}
// 	componentWillUnmount(){
// 		console.log('Text1','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
// 	}
// 	render(){
// 		console.log('Text1','render')
// 		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
// 	}
	
// }

// class Text2 extends Component{
// 	componentDidMount(){
// 		console.log('Text2','++++++++++ componentDidMount ++++++++++')
// 	}
// 	componentWillUnmount(){
// 		console.log('Text2','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
// 	}
// 	render(){
// 		console.log('Text2','render')
// 		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
// 	}
	
// }

// class Text3 extends Component{
// 	componentDidMount(){
// 		console.log('Text3','++++++++++ componentDidMount ++++++++++')
// 	}
// 	componentWillUnmount(){
// 		console.log('Text3','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
// 	}
// 	render(){
// 		console.log('Text3','render')
// 		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
// 	}

// }

// class Text4 extends Component{
// 	componentDidMount(){
// 		console.log('Text4','++++++++++ componentDidMount ++++++++++')
// 	}
// 	componentWillUnmount(){
// 		console.log('Text4','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
// 	}
// 	render(){
// 		console.log('Text4','render')
// 		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
// 	}
// }

/************************************************************* 解决问题-非受控 ******************************************************************************************/
// 1、为什么input的值会没掉
// 2、input有没有重新render？肯定有。但是有没有被销毁？没有。为什么？
// 3、因为input的值既不是受控也不是非受控，他的值并没有被react维护。而值被清空了并不是说组件被销毁了，而是说重新render了，但是值没有被保留下来。
// export default class Example3 extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			data:['a','b','c','d']
// 		}
// 	}
//     handleChange = () => {
//     	this.setState({ data:['d','c','b','a'] })
//     }
//     render(){
//     	return(<div>
//     		{
//     			this.state.data.map((item,index) =>{
//  					return <div key={`${item}-${index}`}>{item}<input /></div>//为什么input的值没掉了？
//     			})
//     		} 
//     		<button onClick={this.handleChange}>改变state</button>
//     	</div>)
//     }
// }

// 1、非受控组件。this.state.value并没有受到props的控制，所以当重新render后，input还是由原来的值控制。
// 2、只不过props改变了，这个本质上和原来是同一个组件，只不过props变了而已。
// export default class Example3 extends Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			data:[
// 				<Text1 p='1'/>,
// 				<Text1 p='2'/>,
// 				<Text1 p='3'/>,
// 				<Text1 p='4'/>
// 			]
// 		}
// 	}
//     handleChange = () => {
//     	this.setState({
//     		data:[
//     			<Text1 p='4'/>,
//     			<Text1 p='3'/>,
//     			<Text1 p='2'/>,
//     			<Text1 p='1'/>
//     		],
//     	})
//     }
//     render(){

//     	return (<div>
//     		<div>
//     			{
//     				this.state.data.map((item) =>{
//     					return item
//     				})
//     			}
//     		</div>
//     		<button onClick={this.handleChange}>改变state</button>
//     	</div>)
//     }
// }

// class Text1 extends Component{
// 	constructor(){
// 		super()
// 		this.state={
// 			value:''
// 		}
// 	}
// 	handleOnChange = (e) => {
// 		this.setState({
// 			value:e.target.value
// 		})
// 	}
// 	UNSAFE_componentWillReceiveProps(props){
// 		console.log('Text1','willReceive',props)
// 	}
// 	componentWillUnmount(){
// 		console.log('Text1','xxxxxxxxxx willUnmount xxxxxxxxxx')
// 	}
// 	render(){
// 		console.log('Text1','render')
// 		return <div>
// 			Text{this.props.p}：<input value={this.state.value} onChange={this.handleOnChange} />
// 		</div>
// 	}
// }


/************************************************************* 解决问题-受控 ******************************************************************************************/
//最佳解决方案：稳定的key，受控组件。
export default class Example3 extends Component{
	constructor(props){
		super(props)
		this.state={
			data:[
				<Text1 key={1} value={1}/>,
				<Text2 key={2} value={2}/>,
				<Text3 key={3} value={3}/>,
				<Text4 key={4} value={4}/>
			]
		}
	}
    handleChange = () => {
    	this.setState({
    		data:[
    			<Text4 key={4} value={4}/>,
    			<Text3 key={3} value={3}/>,
    			<Text2 key={2} value={2}/>,
    			<Text1 key={1} value={1}/>
    		],
    	
    	})
    }
	
    render(){
    	return (<div>
    		<div>
    			{
    				this.state.data.map((item) =>{
    					return item
    				})
    			}
    		</div>
    		<button onClick={this.handleChange}>改变state</button>
    	</div>)
    }
}

class Text1 extends Component{
	componentDidMount(){
		console.log('Text1','++++++++++ componentDidMount ++++++++++')
	}
	componentWillUnmount(){
		console.log('Text1','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
	}
	render(){
		console.log('Text1','render')
		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
	}
	
}

class Text2 extends Component{
	componentDidMount(){
		console.log('Text2','++++++++++ componentDidMount ++++++++++')
	}
	componentWillUnmount(){
		console.log('Text2','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
	}
	render(){
		console.log('Text2','render')
		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
	}
	
}

class Text3 extends Component{
	componentDidMount(){
		console.log('Text3','++++++++++ componentDidMount ++++++++++')
	}
	componentWillUnmount(){
		console.log('Text3','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
	}
	render(){
		console.log('Text3','render')
		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
	}

}

class Text4 extends Component{
	componentDidMount(){
		console.log('Text4','++++++++++ componentDidMount ++++++++++')
	}
	componentWillUnmount(){
		console.log('Text4','xxxxxxxxxx componentWillUnmount xxxxxxxxxx')
	}
	render(){
		console.log('Text4','render')
		return <div>Text{this.props.value}<input value={this.props.value} onChange={()=>{}}/></div>
	}
}