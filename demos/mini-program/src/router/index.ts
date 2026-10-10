import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue'), meta: { title: '首页', tab: true } },
    { path: '/category', component: () => import('@/views/Category.vue'), meta: { title: '点单', tab: true } },
    { path: '/product/:id', component: () => import('@/views/Product.vue'), meta: { title: '商品' } },
    { path: '/cart', component: () => import('@/views/Cart.vue'), meta: { title: '购物车', tab: true } },
    { path: '/checkout', component: () => import('@/views/Checkout.vue'), meta: { title: '确认订单' } },
    { path: '/orders', component: () => import('@/views/Orders.vue'), meta: { title: '订单', tab: true } },
    { path: '/orders/:id', component: () => import('@/views/OrderDetail.vue'), meta: { title: '订单详情' } },
    { path: '/profile', component: () => import('@/views/Profile.vue'), meta: { title: '我的', tab: true } },
    { path: '/coupons', component: () => import('@/views/Coupons.vue'), meta: { title: '优惠券' } },
    { path: '/addresses', component: () => import('@/views/Addresses.vue'), meta: { title: '收货地址' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = typeof to.meta.title === 'string' ? to.meta.title : 'Northline'
  document.title = `${title} · Northline 点单`
})
