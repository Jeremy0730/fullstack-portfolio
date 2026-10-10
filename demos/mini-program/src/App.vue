<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from '@/components/TabBar.vue'
import { useShopStore } from '@/stores/shop'

const route = useRoute()
const shop = useShopStore()
const showTab = computed(() => route.meta.tab === true)
const title = computed(() => (typeof route.meta.title === 'string' ? route.meta.title : 'Northline'))
</script>

<template>
  <div class="stage">
    <div class="phone">
      <header class="capsule">
        <strong>{{ title === '首页' ? 'Northline 点单' : title }}</strong>
        <div class="capsule-dots" aria-hidden="true"><span>●●●</span><span>○</span></div>
      </header>
      <main class="screen">
        <router-view />
      </main>
      <TabBar v-if="showTab" />
      <div v-if="shop.toast" class="toast">{{ shop.toast }}</div>
    </div>
    <p class="stage-copy">小程序界面演示。支付只改订单状态，不会打开微信或支付宝。</p>
  </div>
</template>
