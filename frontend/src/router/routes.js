
const routes = [
  {
    path: '/home',
    component: () => import('components/main/HomePage.vue'),
    meta: {
      needsAuth: true
    },
    children: [
      {
        path: '/inventory',
        component: () => import('components/main/InventoryPage.vue')
      },
      {
        path: '/users',
        component: () => import('components/main/UsersPage.vue')
      },
      {
        path: '/settings',
        component: () => import('components/main/SettingsPage.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('components/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('components/RegisterUserPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
