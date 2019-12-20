import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		loginsuccess : false
  },
  mutations: {
		changeloginsuccess(state){
			state.loginsuccess = !state.loginsuccess
		}
  },
  actions: {
  },
  modules: {
  }
})
