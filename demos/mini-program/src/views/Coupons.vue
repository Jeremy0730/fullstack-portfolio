<script setup lang="ts">
import { coupons } from '@/data/catalog'
import { useShopStore } from '@/stores/shop'

const shop = useShopStore()
</script>

<template>
  <div class="page">
    <article v-for="coupon in coupons" :key="coupon.id" class="panel" style="margin-bottom: 10px">
      <strong>{{ coupon.title }}</strong>
      <p class="muted">{{ coupon.detail }}</p>
      <button v-if="!shop.claimed.includes(coupon.id)" class="btn" type="button" @click="shop.claim(coupon.id)">领取</button>
      <button v-else class="btn-ghost" type="button" @click="shop.selectCoupon(coupon.id)">
        {{ shop.couponId === coupon.id ? '结算时使用中' : '设为结算券' }}
      </button>
    </article>
  </div>
</template>
