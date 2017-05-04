export default {
  listItems: [
    {
      title: 'Today',      
      items: [        
        {
          title: 'You changed security question',
          time: '11:47 PM',       
        },
        {
          title: 'You changed your password',
          time: '11:47 PM',          
        },
        {
          title: 'You logged in Regit',
          time: '11:47 PM',      
        },
      ]
    },
    {
      title: 'Yesterday',      
      items: [
        {
          title: 'You signed out',
          time: '11:47 PM',          
        },
        {
          title: 'You push a information to',
          time: '11:47 PM',
          user: 'Kenny Nguyen',
        },
        {
          title: 'You delegated to',
          time: '11:47 PM',
          user: 'Mia Johnson',
        },
      ]
    },    
  ],
  filterItems: [
    {
      name: 'User',
      route: 'user/setting',
      icon: 'user',
    },
    {
      name: 'Interaction',
      route: 'searchbar',
      icon: 'interaction',
    },
    {
      name: 'Information Vault',
      route: 'vault',
      icon: 'vault',
    },
    {
      name: 'Network',
      route: 'anatomy',
      icon: 'network',
    },    
    {
      name: 'Account Setting',
      route: 'user/setting',
      icon: 'setting',
    },
  ]
}