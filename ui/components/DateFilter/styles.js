import material from '~/theme/variables/material'
export default {
    dateFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: material.white500
    },
    stickPart: {
        paddingRight: 15,
        borderRightColor: material.primaryColor,
        borderRightWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    calendarIcon: {
        color: material.primaryColor,
        fontSize: 20,
        marginRight: 9,
        marginLeft: 10,
    },
    filterIntevalLabel: {
        color: material.primaryColor,
        fontWeight: 'bold'
    },
    intevalValue: {

    },
    dateFilterList: {
      // padding: 50,
      marginRight: 0,
      flexDirection: 'row',
      backgroundColor: material.white500
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
    }


}