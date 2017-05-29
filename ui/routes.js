// import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Notification from './containers/Notification'
import Login from './containers/Login'
import PasswordModifier from './containers/PasswordModifier'
// import SignUpStep1 from './containers/SignUp/Step1'
// import SignUpStep2 from './containers/SignUp/Step2'
// import SignUpStep3 from './containers/SignUp/Step3'
// import SignUpStep4 from './containers/SignUp/Step4'
// import SignUpStep5 from './containers/SignUp/Step5'
// import SignUpStep6 from './containers/SignUp/Step6'
// import UserProfile from './containers/User/Profile'
// import UserSetting from './containers/User/Setting'
// import Delegation from './containers/Delegation/Index'
// import DelegationDetail from './containers/Delegation/Detail'
// import ActivityLog from './containers/ActivityLog'
// import Network from './containers/Network'
// import ChangePassword from './containers/User/Action/ChangePassword'
// import ChangeEmail from './containers/User/Action/ChangeEmail'
// import ChangePIN from './containers/User/Action/ChangePIN'
// import ChangePhoneNumber from './containers/User/Action/ChangePhoneNumber' 
// import ChangeSecurityQuestion from './containers/User/Action/ChangeSecurityQuestion'
// import CloseAccount from './containers/User/Action/CloseAccount'
// import Vault from './containers/Vault'
// import Message from './containers/Message/ChatAvatarList'
// import Interaction from './containers/Interaction'
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
// import TestAnimation from './containers/TestAnimation'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    merchantOverview: {
        title: 'Merchant Name',
        Page: MerchantOverview,
        headerType: 'noBack'
    },
    transactionList: {
        title: 'Danh sách giao dịch',
        Page: TransactionList,
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
    deliveryList: {
        title: 'Danh sách giao hàng',
        Page: DeliveryList
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
    // home: {        
    //     title: 'Home',
    //     Page: Home,     
    //     headerType: 'home',   
    // },  
    notification: {
        title: 'Notification center',
        Page: Notification,
        headerType: 'home',
    },   
    // delegation: {
    //     title: 'Delegation',
    //     Page: Delegation,
    // },
    // 'delegation/detail/:id': {
    //     title: 'Delegation Detail',
    //     Page: DelegationDetail,
    //     headerType: 'back',
    //     footer: false,
    // },
    // 'user/profile': {
    //     title: 'User Profile',
    //     Page: UserProfile,
    //     headerType: 'none',
    // },  
    // 'user/setting': {
    //     title: 'User Setting',
    //     Page: UserSetting,
    // },       
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
  // signup1: {
    //     title: 'Sign Up',
    //     Page: SignUpStep1,        
    //     headerType: 'back',
    //     footerType: 'none',
    // },   
    // signup2: {
    //     title: 'Step 2',
    //     Page: SignUpStep2,        
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // signup3: {
    //     title: 'Step 3',
    //     Page: SignUpStep3,        
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // signup4: {
    //     title: 'Step 4',
    //     Page: SignUpStep4,        
    //     headerType: 'back',
    //     footerType: 'none',
    // },
    // signup5: {
    //     title: 'Step 5',
    //     Page: SignUpStep5,        
    //     headerType: 'back',
    //     footerType: 'none',
    // },
    // signup6: {
    //     title: 'Step 6',
    //     Page: SignUpStep6,        
    //     headerType: 'back',
    //     footerType: 'none',
    // },
    // 'user/action/changePassword':{   
    //     title: 'Change Password',
    //     Page: ChangePassword,
    //     headerType: 'back',
    //     footerType: 'none',
    // },    
    // 'user/action/changeEmail':{
    //     title: 'Change Email',
    //     Page: ChangeEmail,
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // 'user/action/changePIN':{
    //     title: 'Change PIN',
    //     Page: ChangePIN,
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // 'user/action/changePhoneNumber':{
    //     title: 'Change Phone',
    //     Page: ChangePhoneNumber,
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // 'user/action/changeSecurityQuestion':{
    //     title: 'Change Question',
    //     Page: ChangeSecurityQuestion,
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // 'user/action/closeAccount':{
    //     title: 'Close Account',
    //     Page: CloseAccount,
    //     headerType: 'back',
    //     footerType: 'none',
    // }, 
    // activityLog:{
    //     title: 'Activity Log',
    //     Page: ActivityLog,
    //     headerType: 'searchBack',
    // },
    // network:{
    //     title: 'Network',
    //     Page: Network,
    //     headerType: 'searchBack',
    // },
    // vault:{
    //     title: 'Vault',
    //     Page: Vault,        
    // },
    // message:{
    //     title: 'Message',
    //     Page: Message,    
    //     footerType: 'none',
    //     headerType: 'searchBack',    
    // },
    // interaction:{
    //     title: 'Interaction',
    //     Page: Interaction,
    // },
    userManagement: {
        title: 'Quản lý tài khoản',
        Page: UserManagement,
        footerType: 'none',
    },
    'userManagement/action/createUser': {
        title: 'Thêm tài khoản',
        Page: CreateUserContainer,
        footerType: 'none',
    },
    'userManagement/action/updateEmployeeInfo/:id': {
        title: 'Chỉnh sửa thông tin tài khoản',
        Page: CreateUserContainer,
        footerType: 'none',
    },
    'userManagement/action/updateUser': {
        title: 'Thông tin tài khoản',
        Page: UpdateUserContainer,
        footerType: 'none',
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
    // testAnimation: {
    //     title: 'Test Animation',
    //     Page: TestAnimation,
    //     headerType: 'back',
    //     footerType: 'none',
    // },
}
