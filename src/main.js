import Vue from 'vue'
//Bootstrap-vue
import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
//PWA
import './registerServiceWorker'
//WP-API
import http from './plugins/wp-api'
Vue.use(http)
//Other Core
import router from './router'
import store from './store'
//Dependencies
import firebase from 'firebase'
import '@/library/firebaseInit'

import VueOffline from 'vue-offline'
Vue.use(VueOffline)

import Unicon from 'vue-unicons'
import { uniSignOutAlt } from 'vue-unicons/src/icons'

Unicon.add([uniSignOutAlt])
Vue.use(Unicon)

import '../node_modules/nprogress/nprogress.css'
//App
import App from './App.vue'

Vue.config.productionTip = false

let app

firebase.auth().onAuthStateChanged(function() {
  if (!app) {
    /* eslint-disable no-new */ 
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})