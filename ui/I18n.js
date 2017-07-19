import I18n from 'react-native-i18n'
import vi from '~/ui/locales/vi'

I18n.fallbacks = true
I18n.defaultLocale = "vi"
I18n.translations = {  
  vi: vi
}
export default I18n