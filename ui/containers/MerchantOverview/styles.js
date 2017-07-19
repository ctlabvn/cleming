
import { Dimensions } from 'react-native'
import material from '~/theme/variables/material.js'

const {height, width} = Dimensions.get('window');

export default {
    container: {
        backgroundColor: material.backgroundColor1,
        height: '100%',
        width: '100%',
        // paddingBottom: 90 // Why: 40(footer)+50(marginTop contentContainer)
    },
    contentContainer: {
        // marginTop: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topDropdownPlaceHolder: {
        height: 50, 
        width: '100%',
        backgroundColor: material.primaryColor,
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
    funnyToday: {
        color: 'rgba(0,0,0,0.5)',
        marginBottom: 10,
        // fontSize: 16,
        fontWeight: 'bold',
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
        color: material.primaryColor,
    },
    infoItemLabel: {
        color: material.textColor1,
        fontSize: 13
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: material.white500,
        borderRadius: 2,
        padding: 10,
        marginBottom: 10,
        height: 60, 
        width: '100%'
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
        backgroundColor: material.primaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberRight: {
        fontWeight: 'bold',
        color: material.white500,
        textAlign: 'center'
    },
    rightIcon: {
        color: 'rgba(0,0,0,0.5)'
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
        marginLeft: 5,
        color: material.gray500
    },
    success: {
        color: material.successColor
    },
    dateFilterContainer: {
        backgroundColor: material.white500,
        flexDirection: 'column',
        marginLeft: 45,
        marginRight: 20
    },

    textLabelRightImage: {
        color: material.textColor1,
    },
    loadingContainer: {
      backgroundColor: material.white500,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: height - 120 - 76 - 50 - 50 - 50
    },
    menuContainer: {
        alignItems: 'center', 
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        padding: 5
    }

}