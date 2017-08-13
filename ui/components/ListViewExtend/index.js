import React, { PropTypes, Component } from 'react';
import { ListView, Platform, RefreshControl } from 'react-native';

export default class ListViewExtend extends Component {

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

  scrollToTop(){
    this.listview.scrollTo({x:0,y:0,animated:false})
  }

  componentDidMount(){
    this.props.onItemRef && this.props.onItemRef(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataArray),
      });
    }
  }

  render() {
    const {refreshing, onRefresh, ...props} = this.props    
    // show refresh control
    if(onRefresh){
      props.refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
    }
    return (
      <ListView
        ref={ref=>this.listview=ref}
        {...props}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={10}
      />
    );
  }
}
