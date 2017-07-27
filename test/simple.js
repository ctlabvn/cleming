
'use strict'

const assert = require('assert')

const wd = require('wd')
const CONFIG = {
  SERVER: {
    host: 'localhost',
    port: 4723,
  },
  DEVICE: {    
    browserName: '',
    'appium-version': '1.6.5',
    appPackage: 'com.gigatum.clingmemerchant',
    platformName: 'iOS',
    platformVersion: '10.3',
    deviceName: 'iPhone 5',
    app: __dirname + '/../ios/build/Build/Products/Debug-iphonesimulator/Đối Tác.app'
    
    // platformName: 'Android',
    // appPackage: 'com.gigatum.merchantapp',
    // platformVersion: '5.0',
    // deviceName: 'E7AZCY370473',
    // app: '/Users/thanhtu/MyProjects/Nodejs/reactjs/Clingme/MerchantApp/android/app/build/outputs/apk/app-release.apk'
  }
}
Object.freeze(CONFIG)

describe('appium', function () {
  this.timeout(200000)
  let driver
  let allArePassed = true

  before(function () {
    driver = wd.promiseChainRemote(CONFIG.SERVER)
    addEventListenersTo(driver)
    return driver.init(CONFIG.DEVICE)
  })

  after(function () {
    driver.quit()
  })

  afterEach(function () {
    allArePassed = allArePassed && this.currentTest.state === 'passed'
  })

  it('simple', function (done) {

    // driver.waitForElementByAccessibilityId('forgotPassBtn', wd.asserters.isDisplayed, 10000, 100)
    //   .then(function(el){
    //     console.log(el)
    //     done()
    //     // return el.click()
    //   })
    
    // setInterval(()=>{

    driver.elementsByXPath('//*', function (err, elements) {
      elements.forEach(element => element.text().then(function (text) {
        console.log('text', text)      
        console.log(element)  
      }))
    })    

    // }, 5000)
  }) 
})

function isDevelopment() {
  const NODE_ENV = process.env.NODE_ENV
  return !NODE_ENV || (NODE_ENV && NODE_ENV === 'development')
}
function addEventListenersTo(driver) {
  if (!isDevelopment()) {
    return
  }

  driver.on('status', function (info) {
    console.log(info)
  })
  driver.on('command', function (command, method, data) {
    console.log(command, method, data || '')
  })
  driver.on('http', function (method, path, data) {
    console.log(method, path, data || '')
  })
}