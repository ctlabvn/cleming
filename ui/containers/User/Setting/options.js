export default {
  listItems: [
    {
      title: 'MANAGE ACCESS',      
      items: [
        {
          title: 'Change Login Password',
          type: 'route',
          route: 'user/action/changePassword',
        },
        {
          title: 'Set PIN code',
          type: 'route',
          route: 'user/action/changePIN',
        },
        {
          title: 'Phone Number for OTP',
          type: 'route',
          route: 'user/action/changePhoneNumber',
        },
        {
          title: 'Change Email',
          type: 'route',
          route: 'user/action/changeEmail',
        },
        {
          title: 'Change Security Question',
          type: 'route',
          route: 'user/action/changeSecurityQuestion',
        },
      ]
    },
    {
      title: 'NOTIFICATION',      
      items: [
        {
          title: 'Interaction',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Event & Reminders',
          name: 'event',  
          type: 'toggle',
        },
        {
          title: 'Network Request',
          name: 'interaction',  
          type: 'toggle',
        },
      ]
    },
    {
      title: 'ACTIVITY',      
      items: [
        {
          title: 'Keep a record of your logging in/out Regit',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of your profile setting',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of your account setting changes',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of your network activities',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of information vault operations',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of delegation activities',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of your interactions',
          name: 'interaction',  
          type: 'toggle',
        },
        {
          title: 'Keep a record of your social activities',
          name: 'interaction',  
          type: 'toggle',
        },
      ]
    },
    {
      items: [
        {
          title: 'Close your account',
          type: 'user/action/close',
          route: 'user/action/closeAccount',
        },
      ]
    }
  ]
}