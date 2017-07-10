import NotFound from './containers/NotFound'
import Notification from './containers/Notification'
import Login from './containers/Login'
import PasswordModifier from './containers/PasswordModifier'
import Help from './containers/Help'
import UserManagement from './containers/UserManagement'
import CreateUserContainer from './containers/UserManagement/Action/CreateUser'
import UpdateUserContainer from './containers/UserManagement/Action/UpdateUser'
import TransactionList from './containers/TransactionList'
import MerchantOverview from './containers/MerchantOverview'
import ListDeal from './containers/ListDeal'
import DealsOverview from './containers/DealsOverview'
import DealDetail from './containers/DealDetail'
import DeliveryList from './containers/DeliveryList'
import DeliveryDetail from './containers/DeliveryDetail'
import TransactionDetail from './containers/TransactionDetail'
import PlaceOrderList from './containers/PlaceOrderList'
import PlaceOrderDetail from './containers/PlaceOrder/Detail'
import Report from './containers/Report'
import TransactionConfirm from './containers/TransactionConfirm'
import TransactionInputFeedback from './containers/TransactionInputFeedback'
// import ChartDemo from './containers/ChartDemo'
import QRScanner from './containers/QRScanner'
import About from './containers/About'
import I18n from '~/ui/I18n'
import ChartDemo from './containers/ChartDemo'
import MapCluster from './containers/MapCluster'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    about: {
        title: I18n.t('about'),
        Page: About,
        headerType: 'back',
    },
    merchantOverview: {
        title: I18n.t('page_home'),
        Page: MerchantOverview,
        headerType: 'home',
        showTopDropdown: true
    },
    transactionList: {
        title: I18n.t('page_transaction_list'),
        Page: TransactionList,
        headerType: 'back',
        showTopDropdown: true
    },
    'transactionDetail/:id/:type': {
        title: I18n.t('page_transaction_detail'),
        Page: TransactionDetail,
        headerType: 'back',
        footerType: 'none',        
    },
    'transactionInputFeedback/:dealID/:reasonID': {
        title: '',
        Page: TransactionInputFeedback,
        headerType: 'back',
        footerType: 'none'
    },
    deliveryList: {
        title: I18n.t('page_delivery_list'),
        Page: DeliveryList,
        headerType: 'back',
        showTopDropdown: true
    },
    'deliveryDetail/:id': {
        title: I18n.t('page_delivery_detail'),
        Page: DeliveryDetail,
        footerType: 'none'
    },
    report: {
        title: I18n.t('page_customer_statistic'),
        Page: Report,
        showTopDropdown: true
    },
    placeOrderList: {
        title: I18n.t('page_booking_list'),
        Page: PlaceOrderList,
        headerType: 'back',
        showTopDropdown: true
    },
    'placeOrderDetail/:id': {
        title: I18n.t('page_booking_detail'),
        Page: PlaceOrderDetail,
        headerType: 'back',
        footerType: 'none',
    },
    notFound: {
        title: 'Not Found',
        Page: NotFound,
        headerType: 'none',
        footerType: 'none',
    }, 
    notification: {
        title: I18n.t('page_notification'),
        Page: Notification,
        headerType: 'home',
    },           
    login: {
        title: '',
        Page: Login,        
        headerType: 'none',
        footerType: 'none',
    },
    changePassword: {
        title: I18n.t('page_change_password'),
        Page: PasswordModifier,
        footerType: 'none',
        headerType: 'back',
    },
    userManagement: {
        title: I18n.t('page_manage_account'),
        Page: UserManagement,
        footerType: 'none',
        showTopDropdown: true
    },
    'userManagement/action/createUser': {
        title: I18n.t('page_add_account'),
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',
    },
    'userManagement/action/updateEmployeeInfo/:id': {
        title: I18n.t('page_change_info'),
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',
    },
    'userManagement/action/updateUser': {
        title: I18n.t('page_account_info'),
        Page: UpdateUserContainer,
        footerType: 'none',
        headerType: 'back',
    },
    help:{
        title: 'Help',
        Page: Help,
    },
    listdeal: {
        title: 'List Deal',
        Page: ListDeal,
    },
    dealsOverview: {
        title: 'Deals Overview',
        Page: DealsOverview,
        footerType: 'none',
    },
    dealDetail: {
        title: 'Deals Overview',
        Page: DealDetail,
        footerType: 'none',
    },
   
    qrScanner: {
        title: 'QR Scanner',
        Page: QRScanner,
        headerType: 'back',
        footerType: 'none',
    },

    mapCluster: {
        title: 'Map Cluster Demo',
        Page: MapCluster,
        showTopDropdown: true,
    },
}
