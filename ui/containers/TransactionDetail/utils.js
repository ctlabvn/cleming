export const INVOICE_TYPE = {
    HAS_BILL: 1,
    NO_BILL: 0
}

// export const getDateArray = (str) => {
//     if (!str) return
//     console.log('String start', str)
//     str = revertDateTime(str)
//     console.log('String After Revert', str)
//     let result = {
//         year: '',
//         month: '',
//         day: '',
//         hour: '',
//         minute: ''
//     }
//     let partLength = str.length - 4 > 0 ? str.length - 4 : 0
//     let sliceIndex = Math.abs(Math.ceil((partLength) / 2))
//     for (let i = 0; i <= sliceIndex; i++) {
//         // Year Part
//         let value = str
//         value = value.substr(4 + 2 * (i - 1), 2)
//         if (i == 0) {
//             let value = str
//             // Slice first 4-digit
//             value = value.substr(0, 4)
//             result['year'] = value
//             continue
//         }

//         // Month Part
//         else if (i == 1) {
//             if (value.length == 1 && parseInt(value) > 1) {
//                 value = '0' + value.toString()
//                 result['month'] = value
//                 continue
//             }
//             result['month'] = value
//         }
//         // Day Part
//         else if (i == 2) {
//             if (value.length == 1 && parseInt(value) > 3) {
//                 value = '0' + value.toString()
//                 result['day'] = value
//                 continue
//             }
//             result['day'] = value
//         }
//         // Hour Part
//         else if (i == 3) {
//             if (value.length == 1 && parseInt(value) > 2) {
//                 value = '0' + value.toString()
//                 result['hour'] = value
//                 continue
//             }
//             result['hour'] = value
//         }
//         // Minute Part
//         else if (i == 4) {
//             if (value.length == 1 && parseInt(value) > 5) {
//                 value = '0' + value.toString()
//                 result['minute'] = value
//                 continue
//             }
//             result['minute'] = value
//         }
//     }
//     return result
// }

export const getDateArray = (str) => {
    if (!str) return
    str = revertDateTime(str)
    let result = {    
        day: '',
        month: '',
        year: '',
        hour: '',
        minute: ''
    }
    let partDetect = {
        day: {start: 0, length: 2},
        month: {start: 2, length: 2},
        year: {start: 4, length: 4},
        hour: {start: 8, length: 2},
        minute: {start: 10, length: 2}
    }

    let timePart = Object.keys(partDetect)
    let currentPartIdx = 0
    for (let i=0; i<timePart.length; i++){
        currentPartIdx = i
        let currentPart = timePart[currentPartIdx]
        if (str.length < partDetect[currentPart]['start']+partDetect[currentPart]['length'])
            break
    }

    for (let i=0; i<=currentPartIdx; i++){
        let value=str
        value=value.substr(partDetect[timePart[i]].start, partDetect[timePart[i]].length)
        // Day Part
        if (i == 0) {
            if (value.length == 1 && parseInt(value) > 3) {
                value = '0' + value.toString()
                result['day'] = value
                continue
            }
            result['day'] = value
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

        // Year Part
        if (i == 2) {
            result['year'] = value
            continue
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



export const formatDateTime = (str) => {
    if (!str) return
    const dateArr = getDateArray(str)
    let dateLabel = ['day', 'month', 'year', 'hour', 'minute']
    let result = ''
    for (let i = 0; i < dateLabel.length; i++) {
        let label = dateLabel[i]
        let part = dateArr[label]
        if (part && part != '') {
            if (i > 0){
                if (label=='month' || label=='year'){
                    result += '-'
                }else if (label=='hour'){
                    result += ' '
                }else if (label=='minute'){
                    result += ':'
                }
            }
            result += (part)
        }
    }
    return result
}

export const revertDateTime = (str) => {
    if (!str) return ''
    return str.replace(/:|-|\s/g, '')
}