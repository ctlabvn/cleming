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
import CashoutAccount from './containers/CashoutAccount'
import CashoutHistory from './containers/CashoutHistory'
import CashoutDetail from './containers/CashoutDetail'
import CashoutAndPayHistory from './containers/CashoutAndPayHistory'
import PayDetail from './containers/PayDetail'
import Checking from './containers/Checking'
import TransactionHistory from './containers/TransactionHistory'
import WithdrawDetail from './containers/WithdrawDetail'
import CheckingHistory from './containers/CheckingHistory'
import DealManager from './containers/DealManager'
import CreateDeal from './containers/DealManager/CreateDeal'
import DealInfo from './containers/DealManager/DealInfo'
import DealDetail from './containers/DealManager/DealDetail'
import ExperimentAnimate from './containers/ExperimentAnimate'
import QR from './containers/QR'
import { ITEM_ALL_PLACE } from '~/store/constants/app'
// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    comingSoon: {
        title: 'Tính năng đang phát triển',
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
        showItemAllPlaceOnTopDropdown: true,
        cachePlace: {
            selectedPlace: {}
        },
        tabIndex: 0,
        cache: true,
    },
    transactionList: {
        title: I18n.t('page_transaction_list'),
        Page: TransactionList,
        headerType: 'back',
        showTopDropdown: true,
        showItemAllPlaceOnTopDropdown: true,
        cachePlace: {
            selectedPlace: {}
        },
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
        headerType: 'back',
        showTopDropdown: true,
        showItemAllPlaceOnTopDropdown: true,
        cachePlace: {
            selectedPlace: {}
        },
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
        headerType: 'back',
        showTopDropdown: true,
        showItemAllPlaceOnTopDropdown: true,
        cachePlace: {
            selectedPlace: {}
        },
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
        cachePlace: {
            selectedPlace: {}
        },
        headerType: 'home',
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
        cachePlace: {
            selectedPlace: {}
        },
        cache: true,
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
    cashoutAccount: {
        title: I18n.t('page_cashout_account'),
        Page: CashoutAccount,
        headerType: 'back',
        footerType: 'none',
    },
    cashoutHistory: {
        title: I18n.t('cashout_history'),
        Page: CashoutHistory,
        headerType: 'back',
        footerType: 'none',
    },
    cashoutDetail: {
        title: I18n.t('page_cashout_detail'),
        Page: CashoutDetail,
        headerType: 'back',
        footerType: 'none',
    },
    cashoutAndPayHistory: {
        title: I18n.t('page_cashout_and_pay_history'),
        Page: CashoutAndPayHistory,
        headerType: 'back',
        footerType: 'none',
        cache: true,
    },
    payDetail: {
        title: I18n.t('page_pay_detail'),
        Page: PayDetail,
        headerType: 'back',
        footerType: 'none',
    },
    checking: {
        title: I18n.t('checking'),
        Page: Checking,
        headerType: 'back',
        footerType: 'none',
        cache: true,
    },
    transactionHistory: {
        title: I18n.t('transaction_history'),
        Page: TransactionHistory,
        headerType: 'back',
        footerType: 'none',
        showTopDropdown: true,
        showItemAllPlaceOnTopDropdown: true,
        cachePlace: {
            selectedPlace: ITEM_ALL_PLACE
        },
        cache: true,
    },
    withdrawDetail: {
        title: I18n.t('withdraw_detail'),
        Page: WithdrawDetail,
        headerType: 'back',
        footerType: 'none',
    },
    checkingHistory: {
        title: I18n.t('checking_history'),
        Page: CheckingHistory,
        headerType: 'back',
        footerType: 'none',
    },
    dealManager: {
      title: I18n.t('page_deal_manager'),
      Page: DealManager,
      showTopDropdown: true,
      showItemAllPlaceOnTopDropdown: true,
      tabIndex: 1,
      cache: true,
      cachePlace: {
        selectedPlace: {}
      },
      headerType: 'home',
    },
    createDeal: {
      title: I18n.t('page_create_deal'),
      Page: CreateDeal,
      headerType: 'back',
      footerType: 'none',
    },
    dealInfo: {
      title: I18n.t('page_deal_info'),
      Page: DealInfo,
      headerType: 'back',
      footerType: 'none',
    },
    dealDetail: {
      title: I18n.t('page_deal_detail'),
      Page: DealDetail,
      headerType: 'back',
      footerType: 'none',
    },
    animated: {
        title: 'Animated',
        Page: ExperimentAnimate,
        headerType: 'none',
        footerType: 'none',
    },
    qr: {
        title: 'QR',
        Page: QR,
        headerType: 'back',
        footerType: 'none',
    }
}
