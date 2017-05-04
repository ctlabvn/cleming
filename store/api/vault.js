import { apiGet, apiPost } from '~/store/api/common'

export default {

  getVaultInformation(accessToken, VaultInformationId='') {    
    return apiPost('/Api/InformationVaultService/GetVaultInformation', {VaultInformationId}, accessToken)
  },

}
