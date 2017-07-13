import I18n from '~/ui/I18n'
export default {
    listItems: [

        {
            name: 'Quản lý khuyến mãi',
            route: 'comingSoon',
            // icon: 'poll',
        },

        {
            name: 'Quản lý cửa hàng',
            route: 'comingSoon',
            // icon: 'poll',
        },

        {
            name: 'Phản hồi khách hàng',
            route: 'comingSoon',
            // icon: 'poll',
        },

        {
            name: I18n.t('revenue'),
            route: 'revenueManagement',
        },

        {
            name: I18n.t('page_wallet'),
            route: 'wallet',
            // icon: 'poll',
        },
        {
            name: I18n.t('withdraw'),
            route: 'withdraw'
        },

        {
            name: I18n.t('manage_account'),
            route: 'userManagement',
            // icon: 'poll',
        },

        {
            name: 'Inbox',
            route: 'comingSoon',
            // icon: 'poll',
        },

        {
            name: 'Trợ giúp',
            route: 'comingSoon',
            // icon: 'poll',
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