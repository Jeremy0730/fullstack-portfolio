import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from '@/layouts/AdminLayout.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
      meta: { public: true, title: '登录' },
    },
    {
      path: '/',
      component: AdminLayout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
          meta: { title: '工作台' },
        },
        {
          path: 'users',
          component: () => import('@/views/Users.vue'),
          meta: { title: '用户管理' },
        },
        {
          path: 'roles',
          component: () => import('@/views/Roles.vue'),
          meta: { title: '角色权限' },
        },
        {
          path: 'orders',
          component: () => import('@/views/Orders.vue'),
          meta: { title: '订单中心' },
        },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.public) {
    if (to.path === '/login' && auth.token) return '/dashboard'
    return true
  }
  if (!auth.token) return '/login'
  return true
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Northline'
  document.title = `${title} · Northline`
})
