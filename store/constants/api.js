import { Platform } from 'react-native'

// 10.0.2.2 for default Android Simulator
const LOCAL_IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.3.2'

export const API_BASE = 'http://dev.clingme.net:9099'
export const CLINGME_SERVER = 'http://dev.clingme.net:9099/'
export const SENDER_ID = '1075989080862'
export const API_TIMEOUT = 60000


export const NOTIFY_TYPE = {
  WAITING: 5,
  BOOKING: 6,
  SUCCESS: 7,
}