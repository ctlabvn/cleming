import material from '~/theme/variables/material'
export default {
    tabBar: {
        flexDirection: 'row',
        backgroundColor: material.primaryColor,
        justifyContent: 'space-around'
    },
    tabDeactive: {
        flexDirection: 'row',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,

    },
    tabActive: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        // borderBottomWidth: 2,
        // borderColor: material.white500
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabTextActive: {
        color: material.white500,
        marginRight: 6,
        fontWeight: '900',
        fontSize: 14


    },
    tabTextDeactive: {
        color: 'rgba(255,255,255,0.5)',
        marginRight: 6,
        fontWeight: '100',
        fontSize: 14
    },
    tabNumberContainerActive: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: material.white500,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabNumberContainerDeactive: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.5)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabNumberActive: {
        color: material.white500,
        fontSize: 10
    },
    tabNumberDeactive: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10
    }
}