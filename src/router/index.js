import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import firebase from 'firebase';

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Register from '../views/Register.vue'
import InDetail from '../views/application/InDetail.vue'
import VerifyEmail from '../views/application/VerifyEmail.vue'
import Content from '../views/application/Content.vue'
import Reveal from '../views/application/Reveal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
		component: Home,
		meta: {
			requiresGuest: true
		}
  },
  {
    path: '/login',
    name: 'login',
		component: Login,
		meta: {
			requiresGuest: true
		}
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
		component: ResetPassword,
		meta: {
			requiresGuest: true
		}
  },
  {
    path: '/register',
    name: 'register',
		component: Register,
		meta: {
			requiresGuest: true
		}
	},
	{ 
		path: '/indetail', 
		name:'indetail',
		component : InDetail, 
		meta: {
			requiresAuth: true
		},
      children: [
        {
					path: 'verifyemail',
					name: 'verifyemail',
          component: VerifyEmail,
					meta: {
						requiresAuth: true
					}
        },
        {
					path: 'content',
					name: 'content',
          component: Content,
					meta: {
						requiresAuth: true
					}
        },
        {
					path: 'reveal/:resource',
					name: 'reveal',
          component: Reveal,
					meta: {
						requiresAuth: true,
						hideNavigation: true
					},
					props: true
        },
			]
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      // Start the route progress bar.
      NProgress.start()
  }
  next()
})

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.Path
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
			if ($route.path !== path)
      // Go to login
      next({
        path: '/indetail/content',
        query: {
          redirect: to.Path
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
