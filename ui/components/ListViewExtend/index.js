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

    this.state.refreshing = false
    this.scrollTop = 0
    this.up = true
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
    // if (!keyExtractorArr || keyExtractorArr.length == 0) return false
    // for (let i=0; i < keyExtractorArr.length; i++){
    //   if (r1[keyExtractorArr[i]] != r2[keyExtractorArr[i]]) {
    //     return true 
    //   }
    // }
    return false
  }

  swing(){
    // hack with enough amount, just make sure content will not be removed
    this.scrollTop += this.up ? 1 : -1
    this.up = !this.up
    // console.log(scrollTop)
    this.listview.scrollTo({x:0, y:this.scrollTop, animated:true})    
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

  showRefresh(refreshing){
    this.setState({refreshing})
  }

  render() {
    const {onRefresh, ...props} = this.props    
    // show refresh control
    // if(onRefresh){
    //   props.refreshControl = <RefreshControlExtend onRefresh={onRefresh} ref={ref=>this.refreshControl = ref} />
    // }
    return (
      <ListView        
        {...props}
        onMomentumScrollEnd={e=>this.scrollTop = e.nativeEvent.contentOffset.y}
        refreshControl = {<RefreshControl onRefresh={onRefresh} refreshing={this.state.refreshing} />}
        ref={ref=>this.listview=ref}
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={10}
      />
    );
  }
}
