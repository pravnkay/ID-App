/* eslint-disable no-console */

//https://stackoverflow.com/questions/55139074/create-global-axios-configuration-and-add-it-to-the-vue-instance

import axios from "axios";
import Vue from 'vue'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

const devInstance = createInstance("https://pravnkay.com/id/wp-json/idapi/v1");

function createInstance(baseURL){

		if(!window.$cookies.isKey('apiAuthToken')){
			axios.request({
				method: "post",
				baseURL: "https://pravnkay.com/id/wp-json/wp/v2/token",
				params: {
					api_key: '2bBfbWu8lg6xVtKj4iEFdYP7H',
					api_secret: '^#FQ#gJTT5FvRiU)b$Z6u#*3%3hR*%Mo'
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