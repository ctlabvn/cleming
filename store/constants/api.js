import { Platform } from 'react-native'
import {getServerMode} from '~/ui/shared/utils'
import VersionNumber from 'react-native-version-number'
// 10.0.2.2 for default Android Simulator
const LOCAL_IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.3.2'

const CLINGME_DEV_SERVER = 'http://dev.clingme.net:9099'
const CLINGME_PRODUCT_SERVER = 'http://sale.clingme.vn:9868'

// waring before build app
export const MODE = getServerMode(VersionNumber.appVersion)

export const API_BASE = (MODE == 'DEV') ? CLINGME_DEV_SERVER : CLINGME_PRODUCT_SERVER
export const SENDER_ID = '1075989080862'
export const API_TIMEOUT = 30000


export const NOTIFY_TYPE = {
  WAITING: 5,
  BOOKING: 6,
  SUCCESS: 7,
}
export const SECRET_KEY = 'qwerc24214'
