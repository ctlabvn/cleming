import I18n from '~/ui/I18n'
export default { 
  listItems: [
    {
      name: I18n.t('manage_account'),
      route: 'userManagement',
      // icon: 'poll',
    },

    {
        name: I18n.t('revenue_management'),
        route: 'revenueManagement',
    },

    {
        name: I18n.t('about'),
        route: 'about',
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