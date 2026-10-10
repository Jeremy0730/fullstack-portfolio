<script setup lang="ts">
import { reactive } from 'vue'
import { useShopStore } from '@/stores/shop'

const shop = useShopStore()
const form = reactive({ name: '', phone: '', text: '' })

function save() {
  if (form.name.trim().length < 2 || form.phone.trim().length < 6 || form.text.trim().length < 6) {
    shop.notify('请把姓名、电话和地址填完整')
    return
  }
  shop.addAddress({ name: form.name.trim(), phone: form.phone.trim(), text: form.text.trim() })
  form.name = ''
  form.phone = ''
  form.text = ''
}
</script>

<template>
  <div class="page">
    <button
      v-for="item in shop.addresses"
      :key="item.id"
      class="choice"
      :class="{ on: shop.addressId === item.id }"
      type="button"
      @click="shop.addressId = item.id"
    >
      <strong>{{ item.name }} {{ item.phone }}</strong>
      <div class="muted">{{ item.text }}</div>
    </button>
    <section class="panel">
      <h2 style="margin: 0 0 8px; font-size: 16px">新增地址</h2>
      <label class="field">姓名<input v-model="form.name" /></label>
      <label class="field">电话<input v-model="form.phone" /></label>
      <label class="field">地址<textarea v-model="form.text" rows="2" /></label>
      <button class="btn block" type="button" @click="save">保存</button>
    </section>
  </div>
</template>
