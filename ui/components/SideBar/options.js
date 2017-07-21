import I18n from '~/ui/I18n'
export default { 
  listItems: [
    {
      name: I18n.t('manage_account'),
      route: 'userManagement',
      icon: 'account',
    },
    {
        name: I18n.t('about'),
        route: 'about',
        icon: 'info'
    },
    // {
    //   name: 'Quét QR Code',
    //   route: 'qrScanner',
    // }
    // {
    //   name: 'Map Cluster',
    //   route: 'mapCluster',
    // }
  ]


}