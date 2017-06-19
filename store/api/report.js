import { apiGet } from '~/store/api/common'
export default {
    // /customer/statistic
    // placeIds=23221&cateIds=2&fromTime=1448038800&toTime=1448038800

    getCustomerReport(xsession, placeIds, fromTime=1448038800, toTime=1448038800) {
        console.log('Report API', xsession+'---'+placeIds+'---'+fromTime+'----'+toTime)
        return apiGet('/customer/statistic', {placeIds, fromTime, toTime}, xsession)
    },
    getMapStatistic(xsession, placeIds, minLa, minLo, maxLa, maxLo, zoomLevel=5, fromTime=1448038800, toTime=1448038800){
        // placeIds=23221&cateIds=2&fromTime=1448038800&toTime=1448038800&timeRange=&minLa=8.42&maxLa=23.39&minLo=102.15&maxLo=109.47&zoomLevel=6
        // minLa, maxLa, minLo, maxLo: tọa độ 4 góc của bản đồ người dùng dịch chuyển
        // zoomLevel(int): chỉ số zoom của người dùng
        console.log('Map Statistic API', xsession+ '---' + placeIds+'---'+fromTime+'---'+toTime+'---'+minLa+'---'+minLo+'---'+maxLa+'---'+maxLo+'---'+zoomLevel)
        return apiGet('/map/statistic', {placeIds, fromTime, toTime, minLa, minLo, maxLa, maxLo, zoomLevel}, xsession)
    }
}