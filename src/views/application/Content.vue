<template>
	<section class="page-content">
		<div class="inner-content container-fluid">
			<div class="row content-section">
				<div class="col-12">
					<div class="row bg-white has-shadow">
						<b-col>
							
							<h6>Select a year</h6>
							<div>
								<b-card no-body>
									<b-tabs pills card>

										<b-tab v-for="year in this.years"
														:key="year.id"
														:title="year.value"
														v-on:click="yearSlug = year.value">
											<b-card-text>

												<h6>Select a month (optional)</h6>

												<b-form-select v-model="monthSlug" class="mb-3">
													<option v-for="month in months"
																	:key="month.id"
																	v-bind:value="month.id">{{month.value}}</option>
												</b-form-select>

															<h6>Choose a category</h6>
															
															<b-tabs pills card>
																<b-tab v-for="cat in cats"
																				:key="cat.id"
																				:title="cat.value">
																	<b-card-text>

																		<h6>Click on a topic to read</h6>

																		<b-button	class="m-2" variant="primary"
																							v-for="subcat in cat.subcats" 
																							:key="subcat.id"
																							v-on:click="getContent(cat.value+'-'+subcat.value)">{{subcat.value}}</b-button>
																		
																	</b-card-text>
																</b-tab>
															</b-tabs>

											</b-card-text>
										</b-tab>

									</b-tabs>
								</b-card>
							</div>

						</b-col>
					</div>
				</div>
			</div>
		</div>
	</section> 
</template>


<script>
import Vue from 'vue'
import NProgress from 'nprogress'
import Swal from 'sweetalert2'
import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
export default {
  name: 'about',
  components: {
		
	},
	data: function(){
		return{
			authToken : window.$cookies.get('apiAuthToken'),
			posts: [],
			categories: [],
			years: [
				{id:1, value:'2018'},
				{id:2, value:'2019'},
			],
			months: [
				{id:'00', value:'All'},
				{id:'01', value:'January'},
				{id:'02', value:'February'},
				{id:'03', value:'March'},
				{id:'04', value:'April'},
				{id:'05', value:'May'},
				{id:'06', value:'June'},
				{id:'07', value:'July'},
				{id:'08', value:'August'},
				{id:'09', value:'September'},
				{id:'10', value:'October'},
				{id:'11', value:'November'},
				{id:'12', value:'December'},
			],
			cats: [
				{id:1, value:'Banking', subcats: 	[
																						{id:0, value:'All'},
																						{id:1, value:'RBI'},
																						{id:2, value:'SBI'}
																					]},
				{id:2, value:'Sports', subcats: 	[
																						{id:0, value:'All'},
																					]},
			],
			yearSlug: '2018',
			monthSlug: '00'
		}
	},
	computed: {
		level1Cat: function() {
			return this.categories.filter(function(c) {
         if(!c.parent){
					 return c
				 }
     })
		},
	},
	created(){

	},
	methods: {
		resourceMaker: function(catSlug){
			return (catSlug+'/'+this.yearSlug+'/'+this.monthSlug)
		},

		getContent: function(catSlug){
			var vm = this
			const resource = vm.resourceMaker(catSlug)
			if(!vm.isOnline){
				if(!localStorage[resource]){
					vm.swalFire('error', 'No Connectivity & Offline Content', 6000)
				} else {
					vm.swalFire('warning', 'Loading Offline Content', 6000)
					vm.$router.push({ name: 'reveal', params: { 'resource': resource } }).catch(err => {})
				}
			} else {
				if(!localStorage[resource]){
					vm.downloadContent(resource)
				} else {
					vm.swalFire('info', 'Checking for new content', 6000)
					var data = JSON.parse(localStorage[resource])
					this.$http.get('/posts/count/'+resource)
					.then(function (res) {
						if(data.data.length === res.data) {
							vm.swalFire('info', 'Nothing new. Offline content loaded')
							vm.$router.push({ name: 'reveal', params: { 'resource': resource } }).catch(err => {})
						} else {
							Swal.fire({
								title: 'New Content Available',
								text: "Do you want to downlod or continue with pre-saved content ?",
								icon: 'warning',
								showCancelButton: true,
								confirmButtonColor: '#3085d6',
								cancelButtonColor: '#d33',
								confirmButtonText: 'Yes, download it!',
								cancelButtonText: 'No, continue as is!'
							}).then((result) => {
								if (result.value) {
									Swal.fire({
										icon: 'success',
										title: 'Downloading new content',
										toast: true,
										position: 'top-end',
										showConfirmButton: false,
										timer: 2000,
										timerProgressBar: true,
									})
									NProgress.start()
									vm.$http.get('/posts/'+resource)
									.then(function (res) {
										localStorage[resource] = JSON.stringify(res)
										NProgress.done()
										vm.$router.push({ name: 'reveal', params: { 'resource': resource } }).catch(err => {})
									})
								} else {
									vm.$router.push({ name: 'reveal', params: { 'resource': resource } }).catch(err => {})
								}
							})
						}
					})
				}
			}
		},

		downloadContent: function(resource){
			var vm = this
			NProgress.start()
			this.swalFire('info', 'Downloading Content', 6000)
			this.$http.get('/posts/'+resource)
			.then(function (res) {
				vm.swalFire('info', 'Download Successful')
				window.console.log(res)
				localStorage[resource] = JSON.stringify(res)
				NProgress.done()
				vm.$router.push({ name: 'reveal', params: { 'resource': resource } }).catch(err => {})
			}).catch(function (error) {
					NProgress.done()
					console.log(error)
					vm.swalFire('error', 'No Content Available')
			})
		},

		swalFire: function(icon, title, timer = 3000, ) {
			Swal.fire({
				icon: icon,
				title: title,
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: timer,
				timerProgressBar: true,
			})
		},
	}	
}
</script>

<style>


</style>