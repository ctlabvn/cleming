import { Platform } from 'react-native'

// 10.0.2.2 for default Android Simulator
const LOCAL_IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.3.2'

export const API_BASE = 'http://demo.regit.today'
export const API_TIMEOUT = 10000