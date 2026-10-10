<script setup lang="ts">
import { computed, ref } from 'vue'
import { orders as seed, type OrderRow, type OrderStatus } from '@/mock/data'
import { downloadCsv } from '@/utils/csv'

const statuses: Array<OrderStatus | '全部'> = ['全部', '待支付', '待发货', '配送中', '已完成', '已取消']
const status = ref<OrderStatus | '全部'>('全部')
const keyword = ref('')
const current = ref<OrderRow | null>(null)
const drawerOpen = computed({
  get: () => current.value !== null,
  set: (open: boolean) => {
    if (!open) current.value = null
  },
})

const filtered = computed(() =>
  seed.filter((order) => {
    const statusHit = status.value === '全部' || order.status === status.value
    const q = keyword.value.trim()
    const textHit = !q || order.id.includes(q) || order.store.includes(q) || order.customer.includes(q)
    return statusHit && textHit
  }),
)

function tagType(value: OrderStatus) {
  if (value === '已完成') return 'success'
  if (value === '配送中') return 'primary'
  if (value === '待发货') return 'warning'
  if (value === '已取消') return 'danger'
  return 'info'
}

function exportOrders() {
  downloadCsv('northline-orders.csv', [
    ['单号', '门店', '顾客', '渠道', '金额', '状态', '时间'],
    ...filtered.value.map((order) => [
      order.id,
      order.store,
      order.customer,
      order.channel,
      String(order.amount),
      order.status,
      order.createdAt,
    ]),
  ])
}
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>订单中心</h1>
        <p>按状态查看样例订单，点开一行可看商品明细。</p>
      </div>
      <el-button @click="exportOrders">导出 CSV</el-button>
    </div>
    <section class="panel">
      <div class="toolbar">
        <el-radio-group v-model="status">
          <el-radio-button v-for="item in statuses" :key="item" :value="item">{{ item }}</el-radio-button>
        </el-radio-group>
        <el-input v-model="keyword" placeholder="单号、门店或顾客" clearable style="width: 220px" />
      </div>
      <el-table :data="filtered" empty-text="没有匹配的订单" @row-click="(row: OrderRow) => (current = row)">
        <el-table-column prop="id" label="单号" min-width="150" />
        <el-table-column prop="store" label="门店" min-width="140" />
        <el-table-column prop="customer" label="顾客" width="100" />
        <el-table-column prop="channel" label="渠道" width="110" />
        <el-table-column label="金额" width="90">
          <template #default="{ row }">¥{{ row.amount }}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="tagType(row.status)" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="下单时间" width="160" />
      </el-table>
    </section>

    <el-drawer v-model="drawerOpen" :title="current ? current.id : '订单'" size="420px">
      <template v-if="current">
        <p>{{ current.store }} · {{ current.customer }} · {{ current.channel }}</p>
        <el-tag :type="tagType(current.status)">{{ current.status }}</el-tag>
        <el-table :data="current.items" size="small" style="margin-top: 16px">
          <el-table-column prop="name" label="商品" />
          <el-table-column prop="qty" label="数量" width="70" />
          <el-table-column label="单价" width="80">
            <template #default="{ row }">¥{{ row.price }}</template>
          </el-table-column>
        </el-table>
        <p style="text-align: right; font-weight: 700">合计 ¥{{ current.amount }}</p>
      </template>
    </el-drawer>
  </div>
</template>
