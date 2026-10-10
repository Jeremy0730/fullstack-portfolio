<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories, products } from '@/data/catalog'
import { money } from '@/stores/shop'

const route = useRoute()
const router = useRouter()
const keyword = ref(typeof route.query.q === 'string' ? route.query.q : '')
const category = ref<string>(typeof route.query.cat === 'string' ? route.query.cat : '全部')

watch(() => route.query.q, (value) => {
  keyword.value = typeof value === 'string' ? value : ''
})

const list = computed(() =>
  products.filter((item) => {
    const catOk = category.value === '全部' || item.category === category.value
    const q = keyword.value.trim()
    const textOk = !q || item.name.includes(q) || item.blurb.includes(q)
    return catOk && textOk
  }),
)
</script>

<template>
  <div class="page">
    <input v-model="keyword" class="search" placeholder="搜索商品" />
    <div class="chips">
      <button
        v-for="item in categories"
        :key="item"
        class="chip"
        :class="{ on: category === item }"
        type="button"
        @click="category = item"
      >
        {{ item }}
      </button>
    </div>
    <div v-if="list.length" class="list" style="margin-top: 12px">
      <button v-for="item in list" :key="item.id" class="card line" type="button" @click="router.push(`/product/${item.id}`)">
        <div class="swatch" :style="{ background: item.tone, height: '72px', borderRadius: '10px' }">{{ item.category }}</div>
        <div>
          <h3>{{ item.name }}</h3>
          <p class="muted">月售 {{ item.sales }} · {{ item.blurb }}</p>
          <div class="price">{{ money(item.price) }}</div>
        </div>
      </button>
    </div>
    <p v-else class="empty">没有匹配的商品</p>
  </div>
</template>
