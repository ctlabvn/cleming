import { PRIMARY_COLOR } from '~/ui/shared/constants'
export default {
    tabBar: {
        flexDirection: 'row',
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'space-between'
    },
    tabDeactive: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

    },
    tabActive: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderColor: 'white'
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabTextActive: {
        color: 'white',
        marginRight: 3,
        fontWeight: '900',


    },
    tabTextDeactive: {
        color: 'rgba(255,255,255,0.5)',
        marginRight: 3,
        fontWeight: '100'
    },
    tabNumberContainerActive: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'white',
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
        color: 'white',
        fontSize: 10
    },
    tabNumberDeactive: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10
    }
}