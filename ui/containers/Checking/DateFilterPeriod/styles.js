import material from '~/theme/variables/material'
export default {
  itemContainer: {
    width: Math.floor(material.deviceWidth-100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  stickPart: {
      paddingRight: 5,
      borderRightColor: material.primaryColor,
      borderRightWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      width: 80,
  },
  calendarIcon: {
      color: material.primaryColor,
      fontSize: 20,
      marginRight: 2,
      marginLeft: 2,
  },
  filterIntevalLabel: {
      color: material.primaryColor,
      fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  dateFilterListItemDeactive: {
      borderBottomColor: 'transparent',
      marginRight: 0,
      color: 'rgba(0,0,0,0.5)',
      padding: 5
  },
  dateFilterListItemActive: {
      borderBottomColor: 'transparent',
      marginRight: 0,
      color: material.primaryColor,
      fontWeight: 'bold',
      padding: 5
  },
}
