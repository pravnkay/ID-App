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

import firebase from 'firebase'
export default {
	name: 'application',
	components: {
		navbar
	},
	created() {
		var vm = this
		if (firebase.auth().currentUser && firebase.auth().currentUser.emailVerified) {
			this.$router.push({ name: 'content' })
		} else {
			this.$router.push({ name: 'verifyemail' })
		}
	},
	methods: {
		
	}
}
</script>

<style>

</style>
