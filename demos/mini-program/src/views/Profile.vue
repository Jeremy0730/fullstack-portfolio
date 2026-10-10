<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop'

const router = useRouter()
const shop = useShopStore()
const points = computed(() => shop.orders.reduce((sum, order) => sum + Math.round(order.payAmount / 10), 0))
</script>

<template>
  <div class="page">
    <section class="hero">
      <p class="muted" style="color: #dbeafe">Northline 会员</p>
      <h1>顾青</h1>
      <p>积分 {{ points }} · 来自本机演示订单</p>
    </section>
    <div class="list" style="margin-top: 12px">
      <button class="panel" type="button" style="text-align: left" @click="router.push('/coupons')">
        <strong>优惠券</strong>
        <p class="muted">已领取 {{ shop.claimed.length }} 张</p>
      </button>
      <button class="panel" type="button" style="text-align: left" @click="router.push('/addresses')">
        <strong>收货地址</strong>
        <p class="muted">{{ shop.currentAddress?.text }}</p>
      </button>
      <button class="panel" type="button" style="text-align: left" @click="router.push('/orders')">
        <strong>我的订单</strong>
        <p class="muted">{{ shop.orders.length }} 笔</p>
      </button>
    </div>
  </div>
</template>
