import material from '~/theme/variables/material'
import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

export default {
  container: {
    backgroundColor: material.white500,
  },
  listItemContainer: {
    // borderBottomWidth:0.5,
    // borderColor: material.grayColor,
    marginLeft: 0,
    marginRight: 0,
    // paddingTop:0,
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  get listItemContainerRead(){
    return {
      ...this.listItemContainer,
      backgroundColor: material.gray300,
    }
  },
  listItemContent: {
    justifyContent: 'space-between',
    alignSelf: 'flex-start'
  },
  listItemRow: {
    // width: '100%',   
    height: 50,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  titleContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
  circle: {
    width: 6,
    height: 6,
    marginLeft: 17,
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: material.toolbarDefaultBg,
  },
  icon: {
    color: material.gray600,
    alignSelf: 'flex-start',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 3
  },
  textGray: {
    color: material.titleContainer
  },
  get iconWarning() {
    return {
      ...this.icon,
      color: material.orange500,
    }    
  },
   get iconError() {
    return {
      ...this.icon,
      color: material.red500,
    }    
  },
  rowEnd: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  emptyBlock: {
      width: width,
      height: height*3/4,
      alignItems: 'center',
      justifyContent: 'center',
  },
  underBack: {
    color: material.gray400
  },
  subRow: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row'
  },
  textWaiting:{
      fontWeight: '900',
      fontSize: 18,
  },
  textBlue:{ 
    color: material.blue600
  },
  textClingme: {
      fontWeight: '900',
      color: material.blue600,
      fontSize: 24,
  },
  border:{
      marginLeft: 15,
      marginTop: 10,
  }
}