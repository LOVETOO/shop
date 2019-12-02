import Vue from 'vue'
import moment from 'moment'
import './cube-ui'
import App from './App.vue'
import router from './router.js'
import store from './store/'
import './style/common.scss'

import axios from './httpConfig/http'
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
});

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    showToast (msg) {
      const toast = this.$createToast({
        txt: msg,
        type: 'txt'
      })
      toast.show()
    }
  }
}).$mount('#app')
