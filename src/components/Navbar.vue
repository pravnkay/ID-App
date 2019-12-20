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
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path })
        })
		}
  }
};
</script>

<style>

@import '../assets/css/dashboard-skeleton.css';

</style>