export const INVOICE_TYPE = {
    HAS_BILL: 1,
    NO_BILL: 0
}

export const getDateArray = (str) => {
    if (!str) return
    str = revertDateTime(str)
    let result = {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: ''
    }
    let partLength = str.length - 4 > 0 ? str.length - 4 : 0
    let sliceIndex = Math.abs(Math.ceil((partLength) / 2))
    for (let i = 0; i <= sliceIndex; i++) {
        // Year Part
        let value = str
        value = value.substr(4 + 2 * (i - 1), 2)
        if (i == 0) {
            let value = str
            // Slice first 4-digit
            value = value.substr(0, 4)
            result['year'] = value
            continue
        }

        // Month Part
        else if (i == 1) {
            if (value.length == 1 && parseInt(value) > 1) {
                value = '0' + value.toString()
                result['month'] = value
                continue
            }
            result['month'] = value
        }
        // Day Part
        else if (i == 2) {
            if (value.length == 1 && parseInt(value) > 3) {
                value = '0' + value.toString()
                result['day'] = value
                continue
            }
            result['day'] = value
        }
        // Hour Part
        else if (i == 3) {
            if (value.length == 1 && parseInt(value) > 2) {
                value = '0' + value.toString()
                result['hour'] = value
                continue
            }
            result['hour'] = value
        }
        // Minute Part
        else if (i == 4) {
            if (value.length == 1 && parseInt(value) > 5) {
                value = '0' + value.toString()
                result['minute'] = value
                continue
            }
            result['minute'] = value
        }
    }
    return result
}

export const getTimeArray = (str) => {
    if (!str) return
    str = revertDateTime(str)
    let result = {
        hour: '',
        minute: ''
    }
    let sliceIndex = Math.floor(str.length / 2)
    // Hour Part
    for (let i = 0; i <= sliceIndex; i++) {
        let value = str
        value = value.substr(2 * i, 2)
        if (i == 0) {
            if (value.length == 1 && parseInt(value) > 2) {
                value = '0' + value.toString()
            }
            result['hour'] = value > 23 ? 23 : value
            // Minute Part
        } else if (i == 1) {
            if (value.length == 1 && parseInt(value) > 5) {
                value = '0' + value.toString()
            }
            result['minute'] = value > 59 ? 59 : value
        }
    }
    return result
}

export const formatTime = (str) => {
    if (!str) return
    const dateArr = getTimeArray(str)
    let dateLabel = ['hour', 'minute']
    let result = ''
    for (let i = 0; i < dateLabel.length; i++) {
        let part = dateArr[dateLabel[i]]
        if (part && part != '') {
            if (i > 0) result += ':'
            result += (part)
        }
    }
    return result
}


export const formatDateTime = (str) => {
    if (!str) return
    const dateArr = getDateArray(str)
    let dateLabel = ['year', 'month', 'day', 'hour', 'minute']
    let result = ''
    for (let i = 0; i < dateLabel.length; i++) {
        let part = dateArr[dateLabel[i]]
        if (part && part != '') {
            if (i > 0) result += '-'
            result += (part)
        }
    }
    return result
}

export const revertDateTime = (str) => {
    if (!str) return ''
    return str.replace(/:/g, '')
}