<template>
	<section class="page-content">
		<div class="inner-content container-fluid">
			<div class="row content-section">
				<div class="col-12">
					<div class="row bg-white has-shadow">
						<b-col>

							<!-- <ul>
								<li v-for="cat in level1Cat"
										:key="cat.id"
										:ref='cat.id'>{{ cat.name }} {{cat.id}}
										
										<ul>
											<li v-for="c in categories"
													:key="c.id"
													v-if="c.parent === cat.id">{{c.name}} {{c.id}} {{c.parent}}

													<ul>
														<li v-for="c3 in categories"
																:key="c3.id"
																v-if="c3.parent === c.id">{{c3.name}} {{c3.id}} {{c3.parent}}
														</li>
													</ul>

											</li>
										</ul>
								</li>
							</ul> -->

							<div>
								<b-card no-body>
									<b-tabs pills card vertical>

										<b-tab title="2018" active>

											<b-card-text>
												<b-tabs pills card>	

													<b-tab title="Banking" active>
														<b-card-text>
															<b-button class="mr-3" variant="primary" v-on:click="openContent('2018-banking')">Banking Full</b-button>
															<b-button class="mr-3" variant="primary" v-on:click="openContent('2018-banking-sbi')">SBI</b-button>
															<b-button class="mr-3" variant="primary" v-on:click="openContent('2018-banking-sbi')">RBI</b-button>
														</b-card-text>
													</b-tab>
													<b-tab title="Sports">
														<b-card-text>
															<b-button class="mr-3" variant="primary" v-on:click="openContent('2018-sports')">Sports Full</b-button>
														</b-card-text>
													</b-tab>

												</b-tabs>											
											</b-card-text>
										</b-tab>

										<b-tab title="2019">
											<b-card-text>
												To be uploaded
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
		openContent: function(resource){
			window.console.log(resource)
			var vm = this
			if(!this.isOnline){
				if(!localStorage[resource]){
					Swal.fire({
						icon: 'error',
						title: 'No connectivity and content',
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 6000,
						timerProgressBar: true,
						onOpen: (toast) => {
							toast.addEventListener('mouseenter', Swal.stopTimer)
							toast.addEventListener('mouseleave', Swal.resumeTimer)
						}
					})
				} else {
					this.$router.push({ name: 'reveal', params: { 'resource': resource } })
				}
			} else {
				if(!localStorage[resource]){
					NProgress.start()
					this.$http.get('/posts/'+resource)
					.then(function (res) {
						localStorage[resource] = JSON.stringify(res)
						NProgress.done()
						vm.$router.push({ name: 'reveal', params: { 'resource': resource } })
					})
				} else {
					var data = JSON.parse(localStorage[resource])
					window.console.log(data.data.length)
					this.$http.get('/posts/count/'+resource)
					.then(function (res) {
						window.console.log(res)
						if(data.data.length === res.data) {
							vm.$router.push({ name: 'reveal', params: { 'resource': resource } })
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
										vm.$router.push({ name: 'reveal', params: { 'resource': resource } })
									})
								} else {
									vm.$router.push({ name: 'reveal', params: { 'resource': resource } })
								}
							})
						}
					})
				}
			}
		},
	}	
}
</script>

<style>


</style>