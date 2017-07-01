import { TRANSACTION_TYPE_CLINGME, TRANSACTION_TYPE_DIRECT } from '~/store/constants/app'

export default {
  transactionFilterListDirect: [
      {
          value: 0,
          display: 'Tất cả giao dịch'
      },
      {
          value: 1,
          display: 'Chờ phê duyệt'
      },
      {
          value: 2,
          display: 'Cashback thành công'
      },
      {
          value: 3,
          display: 'Bị từ chối'
      }
  ],
  transactionFilterListClingme:[
      {
          value: 0,
          display: 'Tất cả giao dịch'
      },
      {
          value: 1,
          display: 'Đã thanh toán'
      },
      {
          value: 2,
          display: 'Hoàn tất thanh toán'
      }
  ],
  tabData: [
    //   {
    //       tabID: TRANSACTION_TYPE_CLINGME,
    //       text: 'Trả qua Clingme',
    //   },
      {
          tabID: TRANSACTION_TYPE_DIRECT,
          text: 'Trả trực tiếp',
      }
  ]
}