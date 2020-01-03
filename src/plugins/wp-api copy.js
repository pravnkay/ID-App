/* eslint-disable no-console */

//https://stackoverflow.com/questions/55139074/create-global-axios-configuration-and-add-it-to-the-vue-instance

import axios from "axios";
import Vue from 'vue'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

const devInstance = createInstance("https://indetail.halfaman.clothing/wp-json/idapi/v1");

function createInstance(baseURL){

		if(!window.$cookies.isKey('apiAuthToken')){
			axios.request({
				method: "post",
				baseURL: "https://indetail.halfaman.clothing/wp-json/wp/v2/token",
				params: {
					api_key: '2apP0WqdSjk4eBxvqW35PiCIn',
					api_secret: 'p%NrnTIn*s&c755!6pkSLdZB(UU1*Mgz'
				}
			})
			.then(function (res) {
				var token = 'Bearer ' + res.data.access_token
				window.$cookies.set("apiAuthToken", token)
			})
		}

		var authToken = window.$cookies.get("apiAuthToken")
    return axios.create({
        baseURL,
        headers: {
            'Authorization': authToken
        }
    });
}

export default {
    install () {
        Vue.prototype.$http = devInstance
    }
}; // Check debug/build mod