import React, {PropTypes, Component} from 'react'
import { ListView } from 'react-native'
import SGListView from 'react-native-sglistview'

export default class EnhancedListView extends Component {


  constructor(props) {
    super(props)

    if (props.dataArray && props.renderRow) {
      const rowHasChanged = (r1, r2) => this._rowHasChanged(r1, r2)
      const ds = new ListView.DataSource({ rowHasChanged })
      this.state = {
        dataSource: ds.cloneWithRows(props.dataArray),
      }
    } else {
      this.state = {}
    }

  }

  _rowHasChanged = (r1, r2) => {
    const {keyExtractor, rowHasChanged, keyExtractorArr} = this.props
    if (rowHasChanged) return true
    if (!keyExtractor && !keyExtractorArr){
      return r1 != r2
    }
    if (keyExtractor){
      return (keyExtractor(r1) !== keyExtractor(r2))
    }
    if (!keyExtractorArr || keyExtractorArr.length == 0) return false
    for (let i=0; i < keyExtractorArr.length; i++){
      if (r1[keyExtractorArr[i]] != r2[keyExtractorArr[i]]) {
        return true 
      }
    }
    return false
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