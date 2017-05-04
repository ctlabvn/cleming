import { apiGet, apiPost } from '~/store/api/common'

export default {

  getListDelegation(accessToken, Direction='DelegationIn') {    
    return apiPost('/Api/DelegationManager/GetListDelegationFull', {Direction}, accessToken)
  },

}
