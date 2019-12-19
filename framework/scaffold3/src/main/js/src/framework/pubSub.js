import emitter from 'utils/eventUtil'
/**
 * 发布订阅模式
 * 可以用来处理setState，但是不能用来处理调用对象的方法。这个还需完善，可以考虑用IOC容器。
 * @param {*} subscriberKey
 */
function PubSub(subscriberKey) {
	return WrappedComponent => {
		return class extends WrappedComponent {
			constructor(props) {
				super(props)
			}
			componentDidMount() {
				super.componentDidMount && super.componentDidMount()
				this.eventEmitter = emitter.addListener(subscriberKey, this.apiSetState)
			}
      apiSetState = ({ key, value }) => {
      	super.setState({
      		[key]: value,
      	})
      }
      componentWillUnmount() {
      	super.componentWillUnmount && super.componentWillUnmount()
      	emitter.removeListener(subscriberKey, this.apiSetState)
      }
		}
	}
}

export default PubSub
