import React, {PropTypes, Component} from 'react'
import { ListView } from 'react-native'
import SGListView from 'react-native-sglistview'

export default class EnhancedListView extends Component {


  constructor(props) {
    super(props)

    if (props.dataArray && props.renderRow) {
      const keyExtractor = props.keyExtractor || (r=>r)
      const rowHasChanged = props.rowHasChanged || ((r1, r2) => keyExtractor(r1) !== keyExtractor(r2));
      const ds = new ListView.DataSource({ rowHasChanged })
      this.state = {
        dataSource: ds.cloneWithRows(props.dataArray),
      }
    } else {
      this.state = {}
    }

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataArray),
      });
    }
  }


  render() {
    const {dataArray, ...props} = this.props
    if(this.state.dataSource){
      props.dataSource = this.state.dataSource
      props.enableEmptySections = true
    }
    // console.log(props)
    return(
      <SGListView 
      initialListSize={1}
      stickyHeaderIndices={[]}
      onEndReachedThreshold={1}
      scrollRenderAheadDistance={1}
      pageSize={1}       
        {...props}        
      />
    )
  }

}