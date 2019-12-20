<template>	
	<b-container class="vh-100">
		<b-row class="h-100">
			<b-col class="my-auto">			
				<b-row class="mt-auto">
					<b-col class="text-center">
						<h2>Reset Password</h2>
						<p>by entering your email</p>
					</b-col>
				</b-row>
				<b-form>
					<b-row align-h="center">
						<b-col cols="8" lg="4">
							<b-form-group	id="input-group-1" label-for="input-1">
								<b-form-input	id="input-1" v-model="email" type="email" required placeholder="Enter email" />
							</b-form-group>
						</b-col>
					</b-row>
					<b-row align-h="around">
						<b-col cols="8" lg="4" class="d-flex justify-content-between align-items-center">
							<b-button v-on:click="resetPassword" type="submit" variant="primary">Submit</b-button>
						</b-col>
					</b-row>
					<b-row align-h="around">
						<b-col cols="8" lg="4" class="d-flex justify-content-between align-items-center pt-3">
							<router-link :to="{ name: 'register' }" class="text-primary small">Create Account</router-link>
						</b-col>
					</b-row>
				</b-form>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import firebase from "firebase";
import NProgress from 'nprogress';
import Swal from 'sweetalert2'

export default {
  name: "login",
  components: {
    
  },
  data: function() {
    return {
      email: "",
      password: "",
			formfield_in_focus: 0,
    };
  },
  methods: {
    resetPassword: async function(e) {
			e.preventDefault();	
			NProgress.start()
			var auth = firebase.auth();
			var emailAddress = this.email;
			await auth.sendPasswordResetEmail(emailAddress)
			.then(function() {
				NProgress.done()
				Swal.fire({
					icon: 'success',
					title: 'Password reset mail sent',
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
			}).catch(function(error) {
				NProgress.done()
				alert(error)
			})
			this.email = ''
		},
  }
};
</script>