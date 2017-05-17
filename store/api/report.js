import { apiGet } from '~/store/api/common'
export default {
    // /customer/statistic
    // placeIds=23221&cateIds=2&fromTime=1448038800&toTime=1448038800

    getCustomerReport(xsession, placeIds, fromTime=1448038800, toTime=1448038800) {
        console.log('Report API', xsession+'---'+placeIds+'---'+fromTime+'----'+toTime)
        return apiGet('/customer/statistic', {placeIds, fromTime, toTime}, xsession)
    },
}