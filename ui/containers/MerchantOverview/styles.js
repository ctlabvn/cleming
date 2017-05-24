
import { Dimensions } from 'react-native'
import { PRIMARY_COLOR, SUCCESS_COLOR, BACKGROUND_COLOR_1, TEXT_COLOR_1 } from '~/ui/shared/constants'

const {height, width} = Dimensions.get('window');

export default {
    container: {
        backgroundColor: BACKGROUND_COLOR_1,
        height: '100%',
        width: '100%',
        // paddingBottom: 90 // Why: 40(footer)+50(marginTop contentContainer)
    },
    contentContainer: {
        marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topDropdownPlaceHolder: {
        height: 50, 
        width: '100%',
        backgroundColor: '#00a9d4',  
        zIndex: 1000, 
        top: 0, 
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center' 
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
        padding: 5
    },
    infoItemNumber: {
        fontSize: 20,
        color: PRIMARY_COLOR
    },
    infoItemLabel: {
        color: TEXT_COLOR_1,
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
        marginBottom: 7
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
    },

    textLabelRightImage: {
        color: TEXT_COLOR_1,
    },
    loadingContainer: {
      backgroundColor: 'white',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: height - 120 - 76 - 50 - 50 - 50
    }

}