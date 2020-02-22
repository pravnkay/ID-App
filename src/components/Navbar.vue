<template>
	<section>
		<section class="top-bar box-shadow d-flex align-items-center justify-content-center bg-white z-20">
			<div class="top-bar-content container-fluid">
				<b-row>
					<b-col>
						<b-row>
							<div class="page-heading d-flex px-5">
								<h3 class="my-auto text-primary">In Detail</h3>
							</div>
							<div class="col-auto ml-auto mr-3">
								<ul class="nav-menu list-unstyled d-flex flex-md-row h-100 align-items-center">
									<li class="nav-item">
										<a @click=logout v-if="isLoggedIn" class="cursor-pointer" >
											<unicon class="pr-0 font-light" name="sign-out-alt" fill="#d32f2f" width="28px" />
											Sign Out
										</a>
									</li>
								</ul>
							</div>
						</b-row>
					</b-col>
				</b-row>
			</div>
		</section>
	</section>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'
export default {
  name: "Navigation",
  data() {
    return{
      isDown : false,
			isLoggedIn: false,
			arrow : 'angle-left'
    }
  },
  watch: {
		
	},
	mounted() {

	},
	created() {
    if (firebase.auth().currentUser) {
      		this.isLoggedIn = true
		}
	},
	updated() {

	},
	methods: {
		logout: function() {

			var vm = this

			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-danger mx-3',
					cancelButton: 'btn btn-success mx-3'
				},
				buttonsStyling: false
			})

			swalWithBootstrapButtons.fire({
				title: 'Are you sure?',
				text: "You need internet to sign-in again",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, Sign Out!',
				cancelButtonText: 'No, cancel!',
				reverseButtons: true,
				allowOutsideClick: false,
				allowEscapeKey: false,
				focusCancel: true,

			}).then((result) => {
				if (result.value) {
					console.log('logginout')
					firebase
					.auth()
					.signOut()
					.then(() => {
						vm.$router.push({ path: '/login' })
					})
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					Swal.fire({
						icon: 'success',
						toast: true,
						title: 'Back to learning',
						position: 'top-end',
						showConfirmButton: false,
						timer: 1500,
						timerProgressBar: true,
					})
				}
			})
		},
  	}
};
</script>

<style>

@import '../assets/css/dashboard-skeleton.css';

</style>