import I18n from '~/ui/I18n'

const REVENUE_PROCESSING = 1;
const REVENUE_DONE = 2;

export default {
    tabData: [
        {
            tabID: REVENUE_PROCESSING,
            text: I18n.t('revenue_processing'),
        },
        {
            tabID: REVENUE_DONE,
            text: I18n.t('revenue_done'),
        }
    ]
}