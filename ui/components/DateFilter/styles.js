import material from '~/theme/variables/material'
export default {
    dateFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: material.white500
    },
    stickPart: {
        paddingRight: 5,
        borderRightColor: material.primaryColor,
        borderRightWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    calendarSelector: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 5,
        borderWidth: 1,
        borderColor: material.primaryColor,
        borderRadius: 4,
        flex: 1
    },
    buttonCustomDateFilter: {
        backgroundColor: material.primaryColor,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 7,
        paddingRight: 7,
        height: 30

    }


}
