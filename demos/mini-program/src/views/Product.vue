<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findProduct } from '@/data/catalog'
import { money, useShopStore } from '@/stores/shop'

const route = useRoute()
const router = useRouter()
const shop = useShopStore()
const product = computed(() => findProduct(String(route.params.id)))

function stars(score: number) {
  return '★★★★★'.slice(0, score) + '☆☆☆☆☆'.slice(0, 5 - score)
}

function buyNow() {
  if (!product.value) return
  shop.add(product.value.id)
  router.push('/cart')
}
</script>

<template>
  <div v-if="product">
    <div class="swatch" :style="{ background: product.tone, height: '180px', borderRadius: '0' }">{{ product.category }}</div>
    <div class="page">
      <h2 style="margin: 0">{{ product.name }}</h2>
      <p class="muted">月售 {{ product.sales }}</p>
      <div class="price" style="font-size: 22px">{{ money(product.price) }} <s>{{ money(product.origin) }}</s></div>
      <p>{{ product.story }}</p>
      <h3>评价</h3>
      <article v-for="review in product.reviews" :key="review.user" class="panel" style="margin-bottom: 8px">
        <strong>{{ review.user }}</strong>
        <div class="stars">{{ stars(review.score) }}</div>
        <p class="muted">{{ review.text }}</p>
      </article>
    </div>
    <div class="bar">
      <button class="btn-ghost" type="button" @click="shop.add(product.id)">加入购物车</button>
      <button class="btn" type="button" @click="buyNow">立即购买</button>
    </div>
  </div>
  <p v-else class="empty">商品不存在</p>
</template>
