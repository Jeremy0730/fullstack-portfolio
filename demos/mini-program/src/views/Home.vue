<script setup lang="ts">
import { useRouter } from 'vue-router'
import { coupons, products } from '@/data/catalog'
import { money, useShopStore } from '@/stores/shop'

const router = useRouter()
const shop = useShopStore()
const picks = products.slice(0, 4)

function openSearch(event: Event) {
  const value = (event.target as HTMLInputElement).value.trim()
  router.push({ path: '/category', query: value ? { q: value } : {} })
}
</script>

<template>
  <div class="page">
    <section class="hero">
      <p class="muted" style="color: #dbeafe">前滩店 · 今日可取</p>
      <h1>到店或外卖，同一套菜单。</h1>
      <p>演示小程序：选商品、用券、填地址，然后生成一笔样例订单。</p>
    </section>
    <input class="search" placeholder="搜索牛肉面、拿铁、礼盒" @keyup.enter="openSearch" />
    <div class="row-title">
      <h2>可领优惠</h2>
      <button type="button" @click="router.push('/coupons')">全部</button>
    </div>
    <div class="coupon-row">
      <button v-for="coupon in coupons" :key="coupon.id" class="coupon" type="button" @click="shop.claim(coupon.id)">
        <b>{{ coupon.title }}</b>
        <span>{{ shop.claimed.includes(coupon.id) ? '已领取' : '点击领取' }}</span>
      </button>
    </div>
    <div class="row-title">
      <h2>今天在卖</h2>
      <button type="button" @click="router.push('/category')">全部菜单</button>
    </div>
    <div class="grid">
      <button v-for="item in picks" :key="item.id" class="card" type="button" @click="router.push(`/product/${item.id}`)">
        <div class="swatch" :style="{ background: item.tone }">{{ item.category }}</div>
        <div class="body">
          <h3>{{ item.name }}</h3>
          <p class="muted">{{ item.blurb }}</p>
          <div class="price">{{ money(item.price) }} <s>{{ money(item.origin) }}</s></div>
        </div>
      </button>
    </div>
  </div>
</template>
