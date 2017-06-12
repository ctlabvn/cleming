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

import ChartDemo from './containers/ChartDemo'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    merchantOverview: {
        title: 'Merchant Name',
        Page: MerchantOverview,
        headerType: 'home'
    },
    transactionList: {
        title: 'Danh sách giao dịch',
        Page: TransactionList,
        headerType: 'back'
    },
    'transactionDetail/:id/:type': {
        title: 'Chi tiết giao dịch',
        Page: TransactionDetail,
        headerType: 'back',
        footerType: 'none',        
    },
    'transactionConfirm' : {
        title: 'Xác nhận giao dịch',
        Page: TransactionConfirm,
        headerType: 'back',
        footerType: 'none',
        PreLoad: false,
    },
    'transactionConfirmRight' : {
        title: 'Xác nhận giao dịch',
        Page: TransactionConfirm,
        headerType: 'back',
        footerType: 'none',
        PreLoad: false,
    },
    'transactionInputFeedback/:dealID/:reasonID': {
        title: 'Giao dịch trả thiếu tiền',
        Page: TransactionInputFeedback,
        headerType: 'back',
        footerType: 'none'
    },
    deliveryList: {
        title: 'Danh sách giao hàng',
        Page: DeliveryList,
        headerType: 'back'
    },
    'deliveryDetail/:id': {
        title: 'Chi tiết giao hàng',
        Page: DeliveryDetail,
        footerType: 'none'
    },
    report: {
        title: 'Khách hàng tiềm năng',
        Page: Report
    },
    placeOrderList: {
        title: 'Danh sách đặt chỗ',
        Page: PlaceOrderList,
        headerType: 'back'
    },
    'placeOrderDetail/:id': {
        title: 'Chi tiết đặt chỗ',
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
        title: 'Notification center',
        Page: Notification,
        headerType: 'home',
    },           
    login: {
        title: 'Login',
        Page: Login,        
        headerType: 'none',
        footerType: 'none',
    },
    changePassword: {
        title: 'Đổi mật khẩu',
        Page: PasswordModifier,
        footerType: 'none',
    },
    userManagement: {
        title: 'Quản lý tài khoản',
        Page: UserManagement,
        footerType: 'none',
        headerType: 'back',
    },
    'userManagement/action/createUser': {
        title: 'Thêm tài khoản',
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',
    },
    'userManagement/action/updateEmployeeInfo/:id': {
        title: 'Thay đổi thông tin',
        Page: CreateUserContainer,
        footerType: 'none',
        headerType: 'back',
    },
    'userManagement/action/updateUser': {
        title: 'Thông tin tài khoản',
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
   
    chartDemo: {
        title: 'Chart Demo',
        Page: ChartDemo,
        headerType: 'back',
        footerType: 'none',
    },
}
