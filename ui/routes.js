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
import RevenueManagementList from './containers/RevenueManagementList'
import RevenueManagementDetail from './containers/RevenueManagementDetail'
import ComingSoon from './containers/ComingSoon'
import Wallet from './containers/Wallet'
import WalletDetail from './containers/WalletDetail'
import WithDraw from './containers/WithDraw'
import BankAccount from './containers/BankAccount'
// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    bankAccount: {
        title: I18n.t('page_bank_account'),
        Page: BankAccount,
        headerType: 'back',
        footerType: 'none'
    },
    withdraw: {
        title: I18n.t('withdraw'),
        Page: WithDraw,
        headerType: 'back',
        footerType: 'none'
    },
    walletDetail: {
        title: I18n.t('page_wallet_detail'),
        Page: WalletDetail,
        headerType: 'back'
    },
    wallet: {
        title: I18n.t('page_wallet'),
        Page: Wallet,
        headerType: 'back'
    },
    comingSoon: {
        title: 'In the future',
        Page: ComingSoon,
        headerType: 'back',
    },
    about: {
        title: I18n.t('about'),
        Page: About,
        headerType: 'back',
        disableCache: false,
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
        showTopDropdown: true,
    },
    'transactionDetail/:id/:type': {
        title: I18n.t('page_transaction_detail'),
        Page: TransactionDetail,
        headerType: 'back',
        footerType: 'none',        
        disableCache: false,
    },
    'transactionInputFeedback/:dealID/:reasonID': {
        title: '',
        Page: TransactionInputFeedback,
        headerType: 'back',
        footerType: 'none',
        disableCache: false,
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
        footerType: 'none',
        headerType: 'back',
        disableCache: false,
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
        disableCache: false,
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
        disableCache: false,
    },
    changePassword: {
        title: I18n.t('page_change_password'),
        Page: PasswordModifier,
        footerType: 'none',
        headerType: 'back',
        disableCache: false,
    },
    userManagement: {
        title: I18n.t('page_manage_account'),
        Page: UserManagement,
        footerType: 'none',
        showTopDropdown: true,
    },
    'userManagement/action/createUser': {
        title: I18n.t('page_add_account'),
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',
        disableCache: false,
    },
    'userManagement/action/updateEmployeeInfo/:id': {
        title: I18n.t('page_change_info'),
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',
        disableCache: false,
    },
    'userManagement/action/updateUser': {
        title: I18n.t('page_account_info'),
        Page: UpdateUserContainer,
        footerType: 'none',
        headerType: 'back',
        disableCache: false,
    },
    help:{
        title: 'Help',
        Page: Help,
    },
    qrScanner: {
        title: 'QR Scanner',
        Page: QRScanner,
        headerType: 'back',
        footerType: 'none',
        disableCache: false,
    },

    mapCluster: {
        title: 'Map Cluster Demo',
        Page: MapCluster,
        showTopDropdown: true,
        disableCache: false,
    },

    revenueManagementList: {
        title: I18n.t('revenue'),
        Page: RevenueManagementList,
        headerType: 'back',
    },

    'revenueManagementDetail/:tabId': {
        title: I18n.t('revenue_detail'),
        Page: RevenueManagementDetail,
        headerType: 'back',
    }
}
