<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useShopStore } from '@/stores/shop'

const route = useRoute()
const shop = useShopStore()
const tabs = [
  { to: '/', label: '首页' },
  { to: '/category', label: '点单' },
  { to: '/cart', label: '购物车' },
  { to: '/orders', label: '订单' },
  { to: '/profile', label: '我的' },
]

function active(path: string) {
  return route.path === path
}
</script>

<template>
  <nav class="tabs">
    <router-link v-for="tab in tabs" :key="tab.to" :to="tab.to" :class="{ on: active(tab.to) }">
      <span v-if="tab.to === '/cart' && shop.count" class="badge">{{ shop.count }}</span>
      {{ tab.label }}
    </router-link>
  </nav>
</template>
