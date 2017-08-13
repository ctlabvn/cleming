import 'react-native';
import React from 'react';
import URL from 'url-parse'

const routes = {
    comingSoon: {
        
        
        headerType: 'back',
    },
    about: {
        
        
        headerType: 'back',
    },
    merchantOverview: {
        
        
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 0,
        cache: true,
    },
    transactionList: {
        
        
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 1,
        cache: true,
    },
    'transactionDetail/:id/:type': {
        
        
        headerType: 'back',
        footerType: 'none',                
    },
    'transactionInputFeedback/:dealID/:reasonID': {
        
        
        headerType: 'back',
        footerType: 'none',        
    },
    deliveryList: {
        
        
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 1,
        cache: true,
    },
    'deliveryDetail/:id': {
        
        
        footerType: 'none',
        headerType: 'back',        
    },    
    placeOrderList: {
        
        
        headerType: 'home',
        showTopDropdown: true,
        tabIndex: 1,
        cache: true,
    },
    'placeOrderDetail/:id': {
        
        
        headerType: 'back',
        footerType: 'none',        
    },
    report: {
        
        
        showTopDropdown: true,
        tabIndex: 2,
        cache: true,
    },    
    notification: {
        
        
        headerType: 'home',
        tabIndex: 3,
        cache: true,
    },           
    login: {
        
                
        headerType: 'none',
        footerType: 'none',        
    },
    changePassword: {
        
        
        footerType: 'none',
        headerType: 'back',        
    },
    userManagement: {
        
        
        footerType: 'none',
        showTopDropdown: true,        
    },
    'userManagement/action/createUser': {
        
        
        footerType: 'none',
        headerType: 'back',        
    },
    'userManagement/action/updateEmployeeInfo/:id': {
        
        
        footerType: 'none',
        headerType: 'back',        
    },
    'userManagement/action/updateUser': {
        
        
        footerType: 'none',
        headerType: 'back',        
    },
    help:{
        
        
        headerType: 'back',
    },
    // qrScanner: {
    //     
    //     
    //     headerType: 'back',
    //     footerType: 'none',
    // },
    // mapCluster: {
    //     
    //     
    //     showTopDropdown: true,
    // },
    revenueManagementList: {
        
        
        headerType: 'back',
    },
    'revenueManagementDetail/:tabId/:tranId': {
        
        
        headerType: 'back',
    },
    'wallet': {
        
        
        headerType: 'back',
    },
    'walletDetail': {
        
        
        headerType: 'back',
    },
    'withDraw': {
        
        
        headerType: 'back',
        footerType: 'none'
    },
    'bankAccount': {
        
        
        headerType: 'back',
        footerType: 'none'
    },
    'setting': {
        
        
        headerType: 'back',
        footerType: 'none'
    },
    notFound: {
        
        
        headerType: 'none',
        footerType: 'none',
    }, 
}

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

const getPage = (url) => {
  // guard code
  // if(!url) return null
  // const pathname = url.split('?')[0]
  // for (route in routes) {    
  //   const match = matchPath(pathname, {
  //     path: route,
  //     exact: true,
  //     strict: false,
  //   })
  //   if (match) {
  //     // update query and pathname
  //     // const { query } = new URL(url, null, true)
  //     return { ...routes[route], ...match, url, pathname }
  //   }
  // }
  return routes[url]
}

it('renders correctly', () => {
  // const tree = renderer.create(
  //   <Index />
  // );
  const a = Date.now()
  const test = getPage('setting')  
  console.log(test, Date.now()-a,'ms')
});

