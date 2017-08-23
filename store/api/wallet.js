import { apiGet, apiPost } from '~/store/api/common'
export default {
    // transaction/merchantapp/list-direct
    // ?placeId=3108&fromTime=1494257316&toTime=1494257316&option=1&pageNumber=1
    balance(xsession, fromTime, toTime, pageNumber=1) {
        console.log('API Blance: ', xsession+'---'+fromTime+'---'+toTime+'---'+pageNumber)
        return apiGet('/merchantapp/balance', {fromTime, toTime, pageNumber}, xsession)
    },

    balanceDetail(xsession, fromTime, toTime, option=1, pageNumber=1){
        console.log('API Balance Detail: ', xsession+'---'+fromTime+'---'+toTime+'---'+option+'---'+pageNumber)
        return apiGet('/merchantapp/balance-detail', {fromTime, toTime, option, pageNumber}, xsession)
    },

    banks(xsession){
        console.log('Get Banks API: ', xsession)
        return apiGet('/merchantapp/banks', {}, xsession)
    },

    cashout(xsession, bankId, accountNumber, moneyAmount){
        console.log('Cashout API', bankId+'---'+ accountNumber+'---'+ moneyAmount)
        return apiPost('/merchantapp/cashout', {bankId, accountNumber, moneyAmount}, xsession)
    },

    addBank(xsession, accountName, idNumber, accountNumber, bankId, area, branchName){
        console.log('Add Bank API: ', xsession+'---'+accountName+'---'+idNumber+'---'+accountNumber+'---'+bankId+'---'+area+'---'+branchName)
        return apiPost('/merchantapp/add-bank', {accountName, idNumber, accountNumber, bankId, area, branchName}, xsession)
    },
    listBank(xsession){
        return apiGet('/merchantapp/list-bank', {}, xsession)
    },
    getCashoutHistory(xsession, option=0, pageNumber=1){
        console.log('API Get cashoutHistory: ', xsession+'---'+option+'---'+pageNumber)
        return apiGet('/merchantapp/list-cashout', {option, pageNumber}, xsession)
    },
    getCashoutDetail(xsession, cashoutId){
      console.log('API Cashout Detail: ', xsession+'---'+cashoutId)
      return apiGet('/merchantapp/cashout-detail', {cashoutId}, xsession)
    },
    getCashoutOverview(xsession){
      console.log('Call Cashout Overview', xsession);
      return apiGet('/merchantapp/balance-cashout', {}, xsession)
    }



}
