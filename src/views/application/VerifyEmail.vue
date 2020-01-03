<template>
	<section class="page-content">
		<div class="inner-content container-fluid">
			<div class="row content-section">
				<div class="col-12">
					<div class="row bg-white has-shadow">
						<b-col>
							
							<div>
								<b-jumbotron header="InDetail" lead="Account Not Verified">
									<p class="mb-0">Please check your account for email.</p>
									<p>If not recieved click below button to resend verification email.</p>
									<b-button class="mr-3 mt-3 mt-md-0" variant="primary" href="#" @click="sendVerification">Resend Verification Email</b-button>
									<b-button class="mt-3 mt-md-0" variant="primary" href="#" @click="proceedtoApp">Proceed to App</b-button>
								</b-jumbotron>
							</div>

						</b-col>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
	name: 'VerifyEmail',
	components: {

	},
	created() {
		
	},
	methods: {
		sendVerification: function(){
			var vm = this
			firebase.auth().currentUser.sendEmailVerification().then(function(){
				vm.swalFire('info', 'Verification mail re-sent', 2000)
			});
		},

		proceedtoApp: function(){
			this.$router.go({name: 'content'})
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