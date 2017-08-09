import React, { PropTypes, Component } from 'react';
import { ListView, ScrollView, Platform, RefreshControl } from 'react-native';
import SGListViewCell from './components/SGListViewCell';

import { PrivateMethods } from './utils'

/**
 * Some methods are stored here. The benefit of doing so are:
 * 1. The methods are truly private from the outside (unliked the _methodName pattern)
 * 2. The methods aren't instantiated with every instance
 * 3. They're static and hold 0 state
 * 4. Keeps the class size smaller
 */



export default class SGListView extends Component {

  static defaultProps = {
      premptiveLoading: 2,
      enableEmptySections: true,    
  }

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

    this.cellData = {
      lastVisibleRow: 0, // keep track of the last row rendered
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


  /**
   * View Lifecycle Methods
   */

  onChangeVisibleRows(visibleRows, changedRows) {
    // Update cell visibibility per the changedRows
    PrivateMethods.updateCellsVisibility(this.cellData, visibleRows, changedRows);

    // Premepty show rows to avoid onscreen flashes
    PrivateMethods.updateCellsPremptively(this.props, this.cellData, visibleRows);

    // If the user supplied an onChangeVisibleRows function, then call it
    if (this.props.onChangeVisibleRows) {
      this.props.onChangeVisibleRows(visibleRows, changedRows);
    }
  }

  onScroll(e) {
    // onChangeVisibleRows not sent on windows and android; work around this
    if (Platform.OS !== 'ios') {
      const childFrames = [];
      // const { dataSource } = this.state
      // console.log(dataSource)
      const { horizontal } = this.props;
      const allRowIDs = this.state.dataSource.rowIdentities;
      try {
        let idx = 0;
        for (let sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
          const sectionID = this.state.dataSource.sectionIdentities[sectionIdx];
          const rowIDs = allRowIDs[sectionIdx];

          if (this.props.renderSectionHeader) {
            childFrames.push(PrivateMethods.calculateDimensionsForCell(this.cellData, childFrames, sectionID, 'dummy', horizontal, idx++));
          }
          for (let rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
            childFrames.push(PrivateMethods.calculateDimensionsForCell(this.cellData, childFrames, sectionID, rowIDs[rowIdx], horizontal, idx++));
          }
        }
      } catch (ex) {
          // do nothing. This is expected
      }
      // This code is a workaround which unfortunately depends upon calling a private method of the native list view.
      this.getNativeListView()._updateVisibleRows(childFrames); // eslint-disable-line no-underscore-dangle
    }
    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
  }

  getNativeListView() {
    return this.refs.nativeListView;
  }

  // https://github.com/sghiassy/react-native-sglistview/issues/14
  getScrollResponder() {
    return this.refs.nativeListView.getScrollResponder();
  }

  /**
   * Render Methods
   */

  renderScrollComponent(props) {
    let component;

    if (props.renderScrollComponent) {
      component = props.renderScrollComponent(props);
    } else {
      component = (
        <ScrollView {...props} />
      );
    }

    return component;
  }

  // todo this needs to completely represent list view api
  renderRow(rowData, sectionID, rowID, highlightRowFunc) {
    // Get the user's view
    const view = this.props.renderRow(rowData, sectionID, rowID, highlightRowFunc);

    // Wrap the user's view in a SGListViewCell for tracking & performance
    return (
      <SGListViewCell
        usersView={view}
        ref={(row) => {
          // Capture a reference to the cell on creation
          // We have to do it this way for ListView: https://github.com/facebook/react-native/issues/897
          PrivateMethods.captureReferenceFor(this.cellData, sectionID, rowID, row);
        }} />
    );
  }

  renderSectionHeader(sectionData, sectionID) {
    const sectionHeaderSupplied = this.props.renderSectionHeader != undefined;

    if (!sectionHeaderSupplied) {
      return null;
    }

    const view = this.props.renderSectionHeader(sectionData, sectionID);
    return (
      <SGListViewCell
        usersView={view}
        ref={(section) => {
          // Capture a reference to the cell on creation
          // We have to do it this way for ListView: https://github.com/facebook/react-native/issues/897
          PrivateMethods.captureReferenceFor(this.cellData, sectionID, 'dummy', section);
        }} />
      );
  }

  render() {
    const {refreshing, onRefresh, ...props} = this.props    
    // show refresh control
    if(onRefresh){
      props.refreshControl = <RefreshControl refreshing={refreshing} onRefresh={onRefresh} title="Loading..." />
    }
    // console.log('render list')
    return (
      <ListView
        {...props}
        ref="nativeListView"
        dataSource={this.state.dataSource}
        renderScrollComponent={this.renderScrollComponent.bind(this)}
        renderRow={this.renderRow.bind(this)}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
        onChangeVisibleRows={this.onChangeVisibleRows.bind(this)}
        onScroll={this.onScroll.bind(this)} />
    );
  }
}
