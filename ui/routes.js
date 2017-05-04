import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Notification from './containers/Notification'
import Login from './containers/Login'
import SignUpStep1 from './containers/SignUp/Step1'
import SignUpStep2 from './containers/SignUp/Step2'
import SignUpStep3 from './containers/SignUp/Step3'
import SignUpStep4 from './containers/SignUp/Step4'
import SignUpStep5 from './containers/SignUp/Step5'
import SignUpStep6 from './containers/SignUp/Step6'
import UserProfile from './containers/User/Profile'
import UserSetting from './containers/User/Setting'
import Delegation from './containers/Delegation/Index'
import DelegationDetail from './containers/Delegation/Detail'
import ActivityLog from './containers/ActivityLog'
import Network from './containers/Network'
import ChangePassword from './containers/User/Action/ChangePassword'
import ChangeEmail from './containers/User/Action/ChangeEmail'
import ChangePIN from './containers/User/Action/ChangePIN'
import ChangePhoneNumber from './containers/User/Action/ChangePhoneNumber' 
import ChangeSecurityQuestion from './containers/User/Action/ChangeSecurityQuestion'
import CloseAccount from './containers/User/Action/CloseAccount'
import Vault from './containers/Vault'
import Message from './containers/Message'
import Interaction from './containers/Interaction'
import Calendar from './containers/Calendar'

// we can use animationType object for each route via Navigator.SceneConfigs
export default {
    notFound: {
        title: 'Not Found',
        Page: NotFound,
        headerType: 'none',
        footerType: 'none',
    },
    home: {        
        title: 'Home',
        Page: Home,        
    },  
    notification: {
        title: 'Notification',
        Page: Notification,
    },   
    delegation: {
        title: 'Delegation',
        Page: Delegation,
    },
    'delegation/detail/:id': {
        title: 'Delegation Detail',
        Page: DelegationDetail,
        headerType: 'back',
        footer: false,
    },
    'user/profile': {
        title: 'User Profile',
        Page: UserProfile,
        headerType: 'none',
    },  
    'user/setting': {
        title: 'User Setting',
        Page: UserSetting,
    },       
    login: {
        title: 'Login',
        Page: Login,        
        headerType: 'none',
        footerType: 'none',
    },  
    signup1: {
        title: 'Sign Up',
        Page: SignUpStep1,        
        headerType: 'back',
        footerType: 'none',
    },   
    signup2: {
        title: 'Step 2',
        Page: SignUpStep2,        
        headerType: 'back',
        footerType: 'none',
    }, 
    signup3: {
        title: 'Step 3',
        Page: SignUpStep3,        
        headerType: 'back',
        footerType: 'none',
    }, 
    signup4: {
        title: 'Step 4',
        Page: SignUpStep4,        
        headerType: 'back',
        footerType: 'none',
    },
    signup5: {
        title: 'Step 5',
        Page: SignUpStep5,        
        headerType: 'back',
        footerType: 'none',
    },
    signup6: {
        title: 'Step 6',
        Page: SignUpStep6,        
        headerType: 'back',
        footerType: 'none',
    },
    'user/action/changePassword':{   
        title: 'Change Password',
        Page: ChangePassword,
        headerType: 'back',
        footerType: 'none',
    },    
    'user/action/changeEmail':{
        title: 'Change Email',
        Page: ChangeEmail,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/changePIN':{
        title: 'Change PIN',
        Page: ChangePIN,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/changePhoneNumber':{
        title: 'Change Phone',
        Page: ChangePhoneNumber,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/changeSecurityQuestion':{
        title: 'Change Question',
        Page: ChangeSecurityQuestion,
        headerType: 'back',
        footerType: 'none',
    }, 
    'user/action/closeAccount':{
        title: 'Close Account',
        Page: CloseAccount,
        headerType: 'back',
        footerType: 'none',
    }, 
    activityLog:{
        title: 'Activity Log',
        Page: ActivityLog,
        headerType: 'searchBack',
    },
    network:{
        title: 'Network',
        Page: Network,
        headerType: 'searchBack',
    },
    vault:{
        title: 'Vault',
        Page: Vault,        
    },
    message:{
        title: 'Message',
        Page: Message,    
        footerType: 'none',
        headerType: 'searchBack',    
    },
    interaction:{
        title: 'Interaction',
        Page: Interaction,
    },
    calendar:{
        title: 'Calendar',
        Page: Calendar,
    },

}
