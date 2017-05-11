import { PRIMARY_COLOR, SUCCESS_COLOR } from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: 'lightgrey',
        height: '100%',
        width: '100%',
    },
    contentContainer: {
        marginTop: 140,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeInteval: {
        color: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        fontSize: 13,
        marginTop: 10
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10,
        alignItems: 'center'
        // justifyContent: 'space-between'
    },
    infoItem: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        padding: 5
    },
    infoItemBorderRight: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        borderRightColor: 'rgba(0,0,0,0.5)',
        borderRightWidth: 0.5,
        padding: 10
    },
    infoItemNumber: {
        fontSize: 20,
        color: PRIMARY_COLOR
    },
    infoItemLabel: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 13
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 2,
        width: '98%',
        padding: 10,
        marginBottom: 5
    },
    leftBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightBlock: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    badgeContainer: {
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberRight: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    rightIcon: {
        color: 'rgba(0,0,0,0.5)'
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
        marginLeft: 5,
        color: 'grey'
    },
    success: {
        color: SUCCESS_COLOR
    },
    dateFilterContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        marginLeft: 45,
        marginRight: 20
    }

}