<script setup lang="ts">
import { useRouter } from 'vue-router'
import { money, useShopStore } from '@/stores/shop'

const router = useRouter()
const shop = useShopStore()
</script>

<template>
  <div>
    <div v-if="shop.lines.length" class="page">
      <article v-for="line in shop.lines" :key="line.product.id" class="panel line">
        <div class="swatch" :style="{ background: line.product.tone, height: '72px', borderRadius: '10px' }">{{ line.product.category }}</div>
        <div>
          <h3>{{ line.product.name }}</h3>
          <div class="price">{{ money(line.product.price) }}</div>
        </div>
        <div class="stepper">
          <button type="button" @click="shop.setQty(line.product.id, line.qty - 1)">-</button>
          <span>{{ line.qty }}</span>
          <button type="button" @click="shop.setQty(line.product.id, line.qty + 1)">+</button>
        </div>
      </article>
      <p class="muted">优惠在确认订单页选择。当前商品合计 {{ money(shop.goodsAmount) }}。</p>
    </div>
    <div v-else class="empty">
      <p>购物车是空的</p>
      <button class="btn" type="button" @click="router.push('/category')">去点单</button>
    </div>
    <div v-if="shop.lines.length" class="bar">
      <strong>{{ money(shop.goodsAmount) }}</strong>
      <button class="btn" type="button" @click="router.push('/checkout')">去结算</button>
    </div>
  </div>
</template>
