import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { ref } from 'vue'
import { appFeathers } from 'src/boot/bootLib'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const isUserLoggedIn = () => {
  if (localStorage.getItem('feathers-jwt') === '' || localStorage.getItem('feathers-jwt') === null) {
    return false
  } else {
    let isTokenValid = ref(true)
    appFeathers.authenticate({
      strategy: 'jwt',
      accessToken: localStorage.getItem('feathers-jwt')
    }).then(() => {
      isTokenValid = true
    }).catch(e => {
      console.error('Authentication error', e)
      alert('Credentials has already been expired. Please login again.')
      isTokenValid = false
    })
    return isTokenValid
  }
}

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    console.log(to.meta.needsAuth)
    console.log(isUserLoggedIn().value)
    if (to.meta.needsAuth && isUserLoggedIn().value) {
      next()
    } else if (to.meta.needsAuth && !isUserLoggedIn().value) {
      next('/login') // Redirecting to home page when user is trying to enter \login page is still not fix. To be fix on the next sprint.
    } else {
      next()
    }
  })

  return Router
})
