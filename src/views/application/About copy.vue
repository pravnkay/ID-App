<template>
	<section class="page-content">
		<div class="inner-content container-fluid">
			<div class="row content-section">
				<div class="col-12">
					<div class="row bg-white has-shadow">
						<b-col>

									<!-- <router-link @click:openContent('2018-banking') :to="{name : 'revealpop', params:{'resource' : 'posts'} }" target="_blank" tag="button">Home</router-link> -->
									<b-button v-on:click="openContent('2018-banking')">2018 Banking</b-button>
									<b-button v-on:click="openContent('2018-banking-sbi')">2018 Banking rbi</b-button>
									<b-button v-on:click="openContent('2018-sports')">2018 Sports</b-button>
									<b-button v-on:click="openContent('2018')">2018</b-button>


						</b-col>
					</div>
				</div>
			</div>
		</div>
	</section> 
</template>


<script>
import NProgress from 'nprogress'
import Swal from 'sweetalert2'
export default {
  name: 'about',
  components: {
		
	},
	data: function(){
		return{
			posts: [],
			
		}
	},
	computed: {
		networkStatus () {
			return this.isOnline ? true : false
		}
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
						this.$router.push({ name: 'reveal', params: { 'resource': resource } })
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
			// 	NProgress.start()
			// 	var vm = this
			// 	this.$http.get('/posts/'+resource)
			// 	.then(function (res) {
			// 		localStorage[resource] = JSON.stringify(res)
			// 		NProgress.done()
			// 		vm.$router.go('revealpop/'+resource)
			// 	})

			// } else {

			// 	window.console.log('content exists')
			// 	window.console.log(resource)
			// 	// window.open('revealpop/'+resource)
			// 	this.$router.push({ name: 'reveal', params: { 'resource': resource } })

			// }

		}
	}
}
</script>

<style>


</style>