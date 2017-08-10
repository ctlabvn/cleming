import I18n from '~/ui/I18n'
export default {
    listItems: [

        {
            name: 'Quản lý khuyến mãi',
            route: 'comingSoon',
            icon: 'deals',
        },

        {
            name: 'Quản lý cửa hàng',
            route: 'comingSoon',
            icon: 'place-f',
        },

        {
            name: 'Phản hồi khách hàng',
            route: 'comingSoon',
            icon: 'post',
        },

        {
            name: I18n.t('revenue'),
            route: 'revenueManagementList',
            icon: 'term',
        },

        {
            name: 'Thanh toán với Clingme',
            route: 'wallet',
            icon: 'clingme-wallet',
        },

        {
            name: I18n.t('manage_account'),
            route: 'userManagement',
            icon: 'account',
        },
        {
            name: I18n.t('page_setting'),
            route: 'setting',
            icon: 'setting',
        },

        {
            name: 'Inbox',
            route: 'comingSoon',
            icon: 'email-symbol',
        },

        {
            name: 'Trợ giúp',
            route: 'help',
            icon: 'help',
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