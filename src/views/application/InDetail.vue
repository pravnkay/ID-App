<template>
	<div id="application">
		<navbar v-if="!$route.meta.hideNavigation" />
		<router-view></router-view>
	</div>
</template>

<script>
import navbar from '../../components/Navbar'
import store from '../../store'
import Swal from 'sweetalert2'
export default {
	name: 'application',
	components: {
		navbar
	},
	created() {
		if(store.state.loginsuccess){
			this.displayConfirmation()
		}
	},
	methods: {
		displayConfirmation: function(){
			Swal.fire({
				icon: 'success',
				title: 'Signed in successfully',
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
				onOpen: (toast) => {
					toast.addEventListener('mouseenter', Swal.stopTimer)
					toast.addEventListener('mouseleave', Swal.resumeTimer)
				}
			})
			store.commit('changeloginsuccess')
		}
	}
}
</script>

<style>

@import url("../../../node_modules/reveal.js/css/reveal.css");
@import url("../../../node_modules/reveal.js/css/theme/white.css");

</style>
