import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/plugins/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const routes = [
  {
    path: '/',
    component: () => import('@/module/skeleton/view/skeleton.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'suggest-times',
        component: () => import('@/module/suggest-times/view/suggest-times.vue'),
      },
      {
        path: 'prescription',
        component: () => import('@/module/prescription/view/prescription.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/module/auth/login/view/login.vue'),
  },
  {
    path: '/register',
    component: () => import('@/module/auth/register/view/register.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe()
        resolve(user)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = await getCurrentUser()
    if (user) next()
    else next('/login')
  } else next()
})

export default router
