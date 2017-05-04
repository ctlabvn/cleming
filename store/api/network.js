import { apiGet, apiPost } from '~/store/api/common'

export default {

  getNetworks(accessToken) {    
    return apiGet('/Api/Networks', {}, accessToken)
  },

  getNetwork(accessToken, networkId) {    
    return apiGet('/Api/Networks/Friends', {networkId}, accessToken)
  },  

  getBusinessNetwork(accessToken, Start=0, Length=10, UserId='') {
    return apiGet('/Api/AccountSettings/Followee', {Start, Length, UserId}, accessToken)
  },  

  getFollowTransactions(accessToken, ToUser, FromUser='', Length=7, TransactionType=0){
    return apiGet('/Api/AccountSettings/GetFollowTransactions', {FromUser, ToUser, Length, TransactionType}, accessToken)
  },

}