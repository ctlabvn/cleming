import { PureComponent, PropTypes } from 'react'
import { InteractionManager, Platform } from 'react-native'

export default class extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
    placeholder: PropTypes.any,
    renderPlaceholder: PropTypes.func
  }

  static defaultProps = {
    placeholder: null,
    renderPlaceholder: null
  }

  constructor(props) {
    super(props)
    this.interactionHandle = null
    this.state = {interactionsComplete: false}
    // not too long
    this.timer = setTimeout(()=>this.setState({interactionsComplete: true}), props.timeout || 3000)
  }

  componentDidMount() {
    this.interactionHandle = InteractionManager.runAfterInteractions(() => {
      clearTimeout(this.timer)
      this.interactionHandle = null
      // if(Platform.OS === 'android')
        setTimeout(()=> this.setState({interactionsComplete: true}), 300)
      // else
        // this.setState({interactionsComplete: true})
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    if (this.interactionHandle) {
      this.interactionHandle.cancel()
    }
  }

  render() {
    const {
      children,
      placeholder,
      renderPlaceholder
    } = this.props

    if (!this.state.interactionsComplete) {
      return placeholder || (renderPlaceholder && renderPlaceholder())
    }

    return children    
  }
}