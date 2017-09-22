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
    this.oldScrollTop = 0
    this.up = true
    this.scrolling = false
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

  swing(){
    // hack with enough amount, just make sure content will not be removed
    this.scrollTop += this.up ? 1 : -1
    this.up = !this.up
    // console.log(scrollTop)
    this.listview && this.listview.scrollTo({x:0, y:this.scrollTop, animated:true})
  }

  scrollTo(args) {
    this.listview && this.listview.scrollTo(args);
  }

  scrollToEnd(args) {
    this.listview && this.listview.scrollToEnd(args);
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


  // onScroll: function(event) {
  // var currentOffset = event.nativeEvent.contentOffset.y;
  //   var direction = currentOffset > this.offset ? 'down' : 'up';
  // this.offset = currentOffset;
  // console.log(direction);
  // },


  render() {
    const {onRefresh, removeClippedSubviews, ...props} = this.props
    // always override for performance
    let removeSubview = removeClippedSubviews===false ? false:true
    return (
      <ListView
        {...props}
        onScroll={e=>{
          const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent
          {/* console.log('Layout Measurement', layoutMeasurement)
          console.log('Content Offset',  contentOffset)
          console.log('Content Size', contentSize) */}
          this.scrollTop = e.nativeEvent.contentOffset.y
          if (contentSize.height < layoutMeasurement.height){
            this.props.onScrollUp && this.props.onScrollUp()
          }else if (this.scrollTop > 120){
              this.props.onScrollDown && this.props.onScrollDown()
          }
        }}
        onMomentumScrollEnd = {e => {
          if (this.scrollTop < 100){
            this.props.onScrollUp && this.props.onScrollUp()
          }
        }}

        refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={this.state.refreshing} />}
        ref={ref=>this.listview=ref}
        enableEmptySections={true}
        removeClippedSubviews={removeSubview}
        dataSource={this.state.dataSource}
        onEndReachedThreshold={10}
        scrollEventThrottle={200}
      />
    );
  }
}
