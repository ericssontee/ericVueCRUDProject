
const routes = [
  {
    path: '/',
    component: () => import('components/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('components/RegisterUserPage.vue')
  },
  {
    path: '/home',
    component: () => import('components/main/HomePage.vue'),
    meta: {
      needsAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
