<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>

</style>

<script>
import Swal from 'sweetalert2'
export default {
	name: 'app',
	components: {
		
	},
	data: function(){
		return{
			refreshing: false,
      registration: null,
			updateExists: false,
		}
	},
	created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
		});
  },
  methods: {
    showRefreshUI(e) {
      // Display a button inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
			// this.updateExists = true;

			Swal.fire({
				toast: true,
				position: 'top-end',
				showConfirmButton: true,
				confirmButtonText: 'Refresh',
				icon: 'warning',
				title: 'New Content Available'
			}).then((result) => {
				if (result.value) {
					this.refreshApp()
				}
			})
    },
    refreshApp() {
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }
			this.registration.waiting.postMessage("skipWaiting")
			
			Swal.fire({
				toast: true,
				position: 'top-end',
				icon: 'success',
				title: 'Refreshed !'
			})
    }
  }
}
</script>
