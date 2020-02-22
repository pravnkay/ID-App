<template>
	<section class="page-content id">
		<div class="inner-content container-fluid">
			<div class="row content-section">
				<div class="col-12">
					<!-- <p>h is {{acf}}</p> -->
					<div class="row bg-white has-shadow">
						<b-col>

							<div>
								<b-card no-body>
									<h6 class="mb-0 py-3 pl-2">Select a year</h6>
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

												<h6 class="mt-3">Choose a category
												<span v-if="!cats.length" style="" class="spinner-border slim ml-2" role="status"></span></h6> 
												<b-tabs pills card>
													<b-tab v-for="cat in cats"
																	:key="cat.id"
																	:title="cat.value">
														<b-card-text>

															<h6>Click on a topic to read</h6>

															<b-button	class="m-2 final-selection"
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
// import store from './store'
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
			cats: [],
			years: [
				{id:1, value:'2020'},
			],
			months: [
				{id:'00', value:'All Months'},
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
			yearSlug: '2020',
			monthSlug: '00',
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
	mounted(){
		this.catMaker()
	},
	methods: {
		catMaker: function() {
			let vm = this
			const resource = 'offlinecats'
			if(!vm.isOnline){
				if(!localStorage[resource]){

				} else {
					vm.cats = JSON.parse(localStorage[resource])
				}
			} else {
				if(!localStorage[resource]){
					axios.request({
						method: "get",
						baseURL: "https://pravnkay.com/id/wp-json/wp/v2/categories",
					}).then(function (res) {
						let data = res.data
						var ix = 0 //index for main categories array

						data.forEach(function(cat, i) {  // loop for parent categories array
							if(cat.parent === 0) {  // if there is no parent to the current category
								let temp_cat = {}  // a temporary object that gets reset each time
								temp_cat.id = cat.id
								temp_cat.value = cat.name
								temp_cat.subcats = new Array()  // inserting an empty subcategory array
								vm.cats[ix] = temp_cat  // considering it as parent category
								
								var sx = 1 // counter for sub-category array - 0 index is assigned later to 'all'
								data.forEach(function(subcat, i) {  // again, loop through all categories to find the child of the parent
									if(subcat.parent === cat.id) {  // if parent id
										let temp_subcat = {}
										temp_subcat.id = subcat.id
										temp_subcat.value = subcat.name
										vm.cats[ix].subcats[sx] = temp_subcat  // inserting it as a child category
										sx++  // increasing child categ array index
									}
									let temp_subcat = {}  // inserting 'all' subcateg into each parent categ in index 0
									temp_subcat.id = 0
									temp_subcat.value = 'All'
									vm.cats[ix].subcats[0] = temp_subcat
								})

								ix++ // incrementing parent categ array index to next position
							}
						})
						localStorage[resource] = JSON.stringify(vm.cats)	
						vm.$forceUpdate();					
					})
				} else {
					vm.cats = JSON.parse(localStorage[resource])
				}
			}
			console.log(vm.cats)
			vm.$forceUpdate();
		},
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