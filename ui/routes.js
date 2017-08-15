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
import Wallet from './containers/Wallet'
import WalletDetail from './containers/WalletDetail'
import WithDraw from './containers/WithDraw'
import BankAccount from './containers/BankAccount'
import ComingSoon from './containers/ComingSoon'
import Setting from './containers/Setting'
import Checking from './containers/Checking'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    comingSoon: {
        title: 'In the future',
        Page: ComingSoon,
        headerType: 'back',
    },
    about: {
        title: I18n.t('about'),
        Page: About,
        headerType: 'back',
    },
    merchantOverview: {
        title: I18n.t('page_home'),
        Page: MerchantOverview,
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 0,
        cache: true,
    },
    transactionList: {
        title: I18n.t('page_transaction_list'),
        Page: TransactionList,
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 1,
        cache: true,
    },
    transactionDetail: {
        title: I18n.t('page_transaction_detail'),
        Page: TransactionDetail,
        headerType: 'back',
        footerType: 'none',                
    },
    'transactionInputFeedback': {
        title: '',
        Page: TransactionInputFeedback,
        headerType: 'back',
        footerType: 'none',        
    },
    deliveryList: {
        title: I18n.t('page_delivery_list'),
        Page: DeliveryList,
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 1,
        cache: true,
    },
    deliveryDetail: {
        title: I18n.t('page_delivery_detail'),
        Page: DeliveryDetail,
        footerType: 'none',
        headerType: 'back',        
    },    
    placeOrderList: {
        title: I18n.t('page_booking_list'),
        Page: PlaceOrderList,
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 1,
        cache: true,
    },
    placeOrderDetail: {
        title: I18n.t('page_booking_detail'),
        Page: PlaceOrderDetail,
        headerType: 'back',
        footerType: 'none',        
    },
    report: {
        title: I18n.t('page_customer_statistic'),
        Page: Report,
        showTopDropdown: true,
        tabIndex: 2,
        cache: true,
    },    
    notification: {
        title: I18n.t('page_notification'),
        Page: Notification,
        headerType: 'home',
        tabIndex: 3,
        cache: true,
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
        showTopDropdown: true,        
    },
    'userManagement/action/createUser': {
        title: I18n.t('page_add_account'),
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',        
    },
    'userManagement/action/updateEmployeeInfo': {
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
        headerType: 'back',
    },
    // qrScanner: {
    //     title: 'QR Scanner',
    //     Page: QRScanner,
    //     headerType: 'back',
    //     footerType: 'none',
    // },
    // mapCluster: {
    //     title: 'Map Cluster Demo',
    //     Page: MapCluster,
    //     showTopDropdown: true,
    // },
    revenueManagementList: {
        title: I18n.t('revenue'),
        Page: RevenueManagementList,
        headerType: 'back',
    },
    revenueManagementDetail: {
        title: I18n.t('revenue_detail'),
        Page: RevenueManagementDetail,
        headerType: 'back',
    },
    wallet: {
        title: I18n.t('page_wallet'),
        Page: Wallet,
        headerType: 'back',
    },
    walletDetail: {
        title: I18n.t('page_wallet_detail'),
        Page: WalletDetail,
        headerType: 'back',
    },
    withDraw: {
        title: I18n.t('page_bank_account'),
        Page: WithDraw,
        headerType: 'back',
        footerType: 'none'
    },
    bankAccount: {
        title: I18n.t('page_bank_account'),
        Page: BankAccount,
        headerType: 'back',
        footerType: 'none'
    },
    setting: {
        title: I18n.t('page_setting'),
        Page: Setting,
        headerType: 'back',
        footerType: 'none'
    },
    notFound: {
        title: 'Not Found',
        Page: NotFound,
        headerType: 'none',
        footerType: 'none',
    },
    checking: {
        title: I18n.t('checking'),
        Page: Checking,
        headerType: 'back',
        footerType: 'none',
    },
}
