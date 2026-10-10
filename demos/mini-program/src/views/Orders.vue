<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { money, useShopStore, type OrderStatus } from '@/stores/shop'

const router = useRouter()
const shop = useShopStore()
const status = ref<OrderStatus | '全部'>('全部')
const filters: Array<OrderStatus | '全部'> = ['全部', '制作中', '配送中', '已完成']
const list = computed(() => shop.orders.filter((order) => status.value === '全部' || order.status === status.value))
</script>

<template>
  <div class="page">
    <div class="chips">
      <button v-for="item in filters" :key="item" class="chip" :class="{ on: status === item }" type="button" @click="status = item">
        {{ item }}
      </button>
    </div>
    <div v-if="list.length" class="list" style="margin-top: 12px">
      <button v-for="order in list" :key="order.id" class="panel" type="button" style="text-align: left; width: 100%" @click="router.push(`/orders/${order.id}`)">
        <div class="row-title">
          <strong>{{ order.id }}</strong>
          <span class="price">{{ order.status }}</span>
        </div>
        <p class="muted">{{ order.lines.map((line) => `${line.name}×${line.qty}`).join('、') }}</p>
        <strong>{{ money(order.payAmount) }}</strong>
      </button>
    </div>
    <p v-else class="empty">还没有订单。去点一杯，结算后会出现在这里。</p>
  </div>
</template>
