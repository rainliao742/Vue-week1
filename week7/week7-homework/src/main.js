import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
// 匯入 vee-validate
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
// 匯入 全部規則
import AllRules from '@vee-validate/rules'
// 匯入 多國語系功能
import { localize, setLocale } from '@vee-validate/i18n'
// 匯入繁體中文
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import $httpMessageState from '@/utils/pushMessageState'

import App from './App.vue'
import router from './router'
import { date, currency } from './utils/filters'

// 設定規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 表單輸入後進行驗證
})

// 設定語言
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(router)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.component('VForm', Form) // 這邊設定 cart.Vue購物車表單的標籤形式 VForm = v-form
app.component('VField', Field) // 這邊設定 cart.Vue購物車表單內的標籤形式 V-field = v-form
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
