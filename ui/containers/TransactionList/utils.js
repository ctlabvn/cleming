export const _isArrDiff = (arr1, arr2) => {
    if (arr1.length != arr2.length) return true
    for (let i = 0; i < arr1.length; i++) {
        if (_isDiff(arr1[i], arr2[i])) return true
    }
    return false
}
export const _isDiff = (item1, item2) => {
    return (
        item1.transactionType != item2.transactionType
        || item1.transactionStatus != item2.transactionStatus
        || item2.dealTransactionId != item2.dealTransactionId
        || item1.dealTransactionIdDisplay != item2.dealTransactionIdDisplay
        || item1.originPrice != item2.originPrice
        || item1.invoiceTime != item2.invoiceTime
        || item1.moneyNumberClingme != item2.moneyNumberClingme
    )
}