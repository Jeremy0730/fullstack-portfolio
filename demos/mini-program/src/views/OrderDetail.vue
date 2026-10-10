<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { money, useShopStore } from '@/stores/shop'

const route = useRoute()
const router = useRouter()
const shop = useShopStore()
const order = computed(() => shop.orders.find((item) => item.id === String(route.params.id)))
</script>

<template>
  <div v-if="order" class="page">
    <section class="hero">
      <p class="muted" style="color: #dbeafe">演示支付已记录</p>
      <h1>{{ order.status }}</h1>
      <p>{{ order.payMethod }} · {{ order.createdAt }}</p>
    </section>
    <section class="panel" style="margin-top: 12px">
      <p>{{ order.address }}</p>
      <p v-if="order.note" class="muted">备注：{{ order.note }}</p>
    </section>
    <section class="panel" style="margin-top: 10px">
      <p v-for="line in order.lines" :key="line.id">{{ line.name }} × {{ line.qty }} <span class="price">{{ money(line.price * line.qty) }}</span></p>
      <p class="muted">优惠：{{ order.couponTitle }}</p>
      <p>商品 {{ money(order.goodsAmount) }}，实付 <strong>{{ money(order.payAmount) }}</strong></p>
    </section>
    <button v-if="order.status !== '已完成'" class="btn block" style="margin-top: 12px" type="button" @click="shop.advance(order.id)">
      推进到下一状态
    </button>
    <button class="btn-ghost block" style="margin-top: 8px" type="button" @click="router.push('/orders')">返回订单</button>
  </div>
  <p v-else class="empty">找不到这张订单</p>
</template>
