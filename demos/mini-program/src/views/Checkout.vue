<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { money, useShopStore } from '@/stores/shop'

const router = useRouter()
const shop = useShopStore()
const payMethod = ref('微信支付')
const note = ref('')

function submit() {
  const id = shop.placeOrder(payMethod.value, note.value.trim())
  if (!id) {
    shop.notify('请先把商品加入购物车')
    router.push('/category')
    return
  }
  router.replace(`/orders/${id}`)
}
</script>

<template>
  <div>
    <div class="page">
      <section class="panel">
        <div class="row-title"><h2>收货信息</h2><button type="button" @click="router.push('/addresses')">更换</button></div>
        <template v-if="shop.currentAddress">
          <strong>{{ shop.currentAddress.name }} {{ shop.currentAddress.phone }}</strong>
          <p class="muted">{{ shop.currentAddress.text }}</p>
        </template>
      </section>
      <section class="panel" style="margin-top: 10px">
        <h2 style="margin: 0 0 8px; font-size: 16px">商品</h2>
        <p v-for="line in shop.lines" :key="line.product.id">
          {{ line.product.name }} × {{ line.qty }}
          <span class="price">{{ money(line.product.price * line.qty) }}</span>
        </p>
        <p v-if="!shop.lines.length" class="muted">购物车是空的</p>
      </section>
      <section class="panel" style="margin-top: 10px">
        <h2 style="margin: 0 0 8px; font-size: 16px">优惠券</h2>
        <button
          v-for="coupon in shop.ownedCoupons"
          :key="coupon.id"
          class="choice"
          :class="{ on: shop.couponId === coupon.id }"
          type="button"
          @click="shop.selectCoupon(coupon.id)"
        >
          <strong>{{ coupon.title }}</strong>
          <div class="muted">满 {{ coupon.min }} 可用 · {{ coupon.detail }}</div>
        </button>
        <p v-if="!shop.ownedCoupons.length" class="muted">还没有领取优惠券</p>
      </section>
      <section class="panel" style="margin-top: 10px">
        <h2 style="margin: 0 0 8px; font-size: 16px">支付方式</h2>
        <button class="choice" :class="{ on: payMethod === '微信支付' }" type="button" @click="payMethod = '微信支付'">微信支付（演示）</button>
        <button class="choice" :class="{ on: payMethod === '支付宝' }" type="button" @click="payMethod = '支付宝'">支付宝（演示）</button>
        <label class="field">备注
          <input v-model="note" placeholder="少冰、不要香菜" />
        </label>
      </section>
    </div>
    <div class="bar">
      <div>
        <strong>{{ money(shop.payAmount) }}</strong>
        <div v-if="shop.discount" class="muted">已减 {{ money(shop.discount) }}</div>
      </div>
      <button class="btn" type="button" @click="submit">确认支付</button>
    </div>
  </div>
</template>
