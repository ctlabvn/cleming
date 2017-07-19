import {apiPost, apiGet} from '~/store/api/common'
import {API_BASE, SECRET_KEY} from '~/store/constants/api'
import md5 from 'md5'
import 'whatwg-fetch'
import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'
export default {


    login(username, password, xDevice, xUniqueDevice) {
        console.log('Login API', username + '---' + password + '---' + xDevice + '---' + xUniqueDevice)
        // let crypto = require('crypto')
        let xVersion = 1
        let xDataVersion = 1
        let xTimeStamp = Math.floor((new Date().getTime()) / 1000)
        let body = JSON.stringify({
            userName: username.trim(),
            password: md5(password),
        })
        let xAuthStr = "" + xDataVersion + xVersion + xTimeStamp + SECRET_KEY + body
        console.log('xAUTH Str Login', xAuthStr)
        let xAuth = SHA256(xAuthStr).toString(CryptoJS.enc.Hex)
        console.log('xAuth Hex Login', xAuth)

        return fetch(API_BASE + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-VERSION': xVersion,
                'X-TIMESTAMP': xTimeStamp,
                'X-DATA-VERSION': xDataVersion,
                'X-AUTH': xAuth,
                'X-DEVICE': xDevice,
                'X-UNIQUE-DEVICE': xUniqueDevice
            },
            body:body
        }).then(async (response) => {
            const xsession = response.headers.map['x-session']
            const body = await response.json()
            console.log('Response', response)
            console.log('Body', body)
            if (xsession){
                
                return {...body.updated.account, xsession}
            }
            const {status, statusText} = response
            return Promise.reject({message: statusText, status, ...body})
            
        })
    },

    // login(userName, password) {
    //   return apiPost('/login', {
    //     userName,
    //     password
    //   })
    // },

    refreshAccessToken(refreshToken) {
        return apiPost(`/auth/token`, {
            refreshToken,
        })
    },

    reject(refreshToken) {
        return apiPost(`/auth/reject`, {
            refreshToken,
        })
    },

    /**
     * Logs the current user out
     */
    logout(session, xDevice, xUniqueDevice) {
        // return fetchJsonWithToken(token, `/logout`)
        console.log('API logout', session + '---' + xDevice + '---' + xUniqueDevice)
        return apiGet(`/logout`, {}, session, {'X-DEVICE': xDevice, 'X-UNIQUE-DEVICE': xUniqueDevice})
    },

}
