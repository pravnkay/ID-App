<template>	
	<b-container class="vh-100">
		<b-row class="h-100">
			<b-col class="my-auto">			
				<b-row class="mt-auto">
					<b-col class="text-center">
						<h2>Register</h2>
						<p>using email to access application</p>
					</b-col>
				</b-row>
				<b-form>
					<b-row align-h="center">
						<b-col cols="8" lg="4">
							<b-form-group	id="input-group-1" label-for="input-1" description="Your data is safely stored with Google">
								<b-form-input	id="input-1" v-model="email" type="email" required placeholder="Enter email" />
							</b-form-group>
							<b-form-group	id="input-group-2" label-for="input-2">
								<b-form-input	id="input-2" v-model="password" type="password" required placeholder="Enter password" />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row align-h="around">
						<b-col cols="8" lg="4" class="d-flex justify-content-between align-items-center">
							<b-button v-on:click="register" type="submit" variant="primary">Submit</b-button>
							<router-link :to="{ name: 'login'}" class="text-primary small ml-auto">Have an account ?</router-link>
						</b-col>
					</b-row>
					<b-row align-h="around">
						<b-col cols="8" lg="4" class="d-flex justify-content-between align-items-center pt-3">
							<router-link :to="{ name: 'home' }" class="text-primary small">Back to Home</router-link>
						</b-col>
					</b-row>
				</b-form>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import NProgress from 'nprogress'
import firebase from "firebase"
import Swal from 'sweetalert2'

export default {
	data: function() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
    register: function(e) {
			e.preventDefault()

			var vm = this
			vm.swalFire('info', 'Account being created', 2000)

			NProgress.start()

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
						vm.swalFire('success', 'Account Created', 2000)
						NProgress.done()
						firebase.auth().currentUser.sendEmailVerification().then(function(){
							vm.swalFire('info', 'Verification mail sent', 2000)
						});
            this.$router.push({ name: 'verifyemail' });
          },
          err => {
						NProgress.done()
						vm.swalFire('error', err.message, 2000)
            console.log(err.message);
          }
				);
      e.preventDefault();
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