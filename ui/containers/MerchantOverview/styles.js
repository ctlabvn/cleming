import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
    container: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: '100%',
        width: '100%',
    },
    contentContainer: {
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeInteval: {
        color: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        fontSize: 13
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
        fontSize: 22,
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
    numberRight: {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: PRIMARY_COLOR,
        width: 25,
        height: 25,
        borderRadius: 25,
        textAlign: 'center'
    },
    rightIcon: {
        color: 'rgba(0,0,0,0.5)'
    }


}