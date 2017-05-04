// import { PRIMARY_COLOR } from '~/store/constants/colors'
const PRIMARY_COLOR = '#1b9dd8'
export default {
    dateFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    stickPart: {
        paddingRight: 15,
        borderRightColor: PRIMARY_COLOR,
        borderRightWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5
    },
    calendarIcon: {
        color: PRIMARY_COLOR
    },
    filterIntevalLabel: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    },
    intevalValue: {

    },
    dateFilterList: {
        // padding: 50,
        flexDirection: 'row'
    },
    dateFilterListItemDeactive: {
        borderBottomColor: 'transparent',
        marginRight: 25,
        color: 'rgba(0,0,0,0.5)'
    },
    dateFilterListItemActive: {
        borderBottomColor: 'transparent',
        marginRight: 25,
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    }


}