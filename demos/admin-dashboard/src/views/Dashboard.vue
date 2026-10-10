<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/stores/app'
import {
  categorySales,
  channelShare,
  orders,
  revenueDays,
  revenueSeries,
  type OrderStatus,
} from '@/mock/data'

const router = useRouter()
const app = useAppStore()
const revenueRef = ref<HTMLDivElement | null>(null)
const channelRef = ref<HTMLDivElement | null>(null)
const categoryRef = ref<HTMLDivElement | null>(null)
const series = ref([...revenueSeries])

let revenueChart: echarts.ECharts | null = null
let channelChart: echarts.ECharts | null = null
let categoryChart: echarts.ECharts | null = null

const stats = [
  { label: '近 7 日营收', value: '¥142.4 万', delta: '较上周 +8.6%', up: true, tone: 'blue' },
  { label: '新增用户', value: '186', delta: '较上周 +12', up: true, tone: 'green' },
  { label: '履约中订单', value: '37', delta: '超时 3 笔', up: false, tone: 'amber' },
  { label: '复购率', value: '28.4%', delta: '较上周 -0.6%', up: false, tone: 'violet' },
]

const recent = orders.slice(0, 5)

function textColor() {
  return app.dark ? '#94a3b8' : '#64748b'
}

function render() {
  const color = textColor()
  if (revenueRef.value) {
    revenueChart ??= echarts.init(revenueRef.value)
    revenueChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 40, right: 16, top: 24, bottom: 28 },
      xAxis: { type: 'category', data: revenueDays, axisLabel: { color } },
      yAxis: { type: 'value', axisLabel: { color }, splitLine: { lineStyle: { color: app.dark ? '#1f2937' : '#eef2f7' } } },
      series: [{
        type: 'line',
        smooth: true,
        data: series.value,
        symbolSize: 8,
        lineStyle: { width: 3, color: '#2563eb' },
        areaStyle: { color: 'rgba(37, 99, 235, 0.16)' },
        itemStyle: { color: '#2563eb' },
      }],
    })
  }
  if (channelRef.value) {
    channelChart ??= echarts.init(channelRef.value)
    channelChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0, textStyle: { color } },
      series: [{
        type: 'pie',
        radius: ['48%', '72%'],
        center: ['50%', '44%'],
        data: channelShare,
        label: { color },
      }],
    })
  }
  if (categoryRef.value) {
    categoryChart ??= echarts.init(categoryRef.value)
    categoryChart.setOption({
      tooltip: { trigger: 'axis' },
      grid: { left: 48, right: 12, top: 16, bottom: 28 },
      xAxis: { type: 'category', data: categorySales.map((item) => item.name), axisLabel: { color } },
      yAxis: { type: 'value', axisLabel: { color }, splitLine: { lineStyle: { color: app.dark ? '#1f2937' : '#eef2f7' } } },
      series: [{
        type: 'bar',
        data: categorySales.map((item) => item.value),
        barWidth: 28,
        itemStyle: { color: '#0ea5e9', borderRadius: [6, 6, 0, 0] },
      }],
    })
  }
}

function refresh() {
  series.value = series.value.map((value) => Math.max(120, Math.round(value * (0.96 + Math.random() * 0.08))))
  render()
  ElMessage.success('已用样例波动刷新看板')
}

function tagType(status: OrderStatus) {
  if (status === '已完成') return 'success'
  if (status === '配送中') return 'primary'
  if (status === '待发货') return 'warning'
  if (status === '已取消') return 'danger'
  return 'info'
}

function onResize() {
  revenueChart?.resize()
  channelChart?.resize()
  categoryChart?.resize()
}

onMounted(() => {
  render()
  window.addEventListener('resize', onResize)
})

watch(() => app.dark, () => render())
watch(() => app.collapsed, () => window.setTimeout(onResize, 220))

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  revenueChart?.dispose()
  channelChart?.dispose()
  categoryChart?.dispose()
})
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>工作台</h1>
        <p>样例数据，展示多门店近 7 日经营情况。</p>
      </div>
      <el-button @click="refresh">刷新样例</el-button>
    </div>
    <div class="stats">
      <article v-for="item in stats" :key="item.label" class="stat" :class="item.tone">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
        <div class="delta" :class="item.up ? 'up' : 'down'">{{ item.delta }}</div>
      </article>
    </div>
    <div class="grid-2">
      <section class="panel">
        <strong>近 7 日营收（万元）</strong>
        <div ref="revenueRef" class="chart"></div>
      </section>
      <section class="panel">
        <strong>订单渠道</strong>
        <div ref="channelRef" class="chart"></div>
      </section>
    </div>
    <div class="grid-2">
      <section class="panel">
        <strong>品类销量</strong>
        <div ref="categoryRef" class="chart"></div>
      </section>
      <section class="panel">
        <div class="page-head" style="margin-bottom: 8px">
          <strong>最新订单</strong>
          <el-button link type="primary" @click="router.push('/orders')">查看全部</el-button>
        </div>
        <el-table :data="recent" size="small">
          <el-table-column prop="id" label="单号" min-width="140" />
          <el-table-column prop="store" label="门店" min-width="120" />
          <el-table-column prop="amount" label="金额" width="80">
            <template #default="{ row }">¥{{ row.amount }}</template>
          </el-table-column>
          <el-table-column label="状态" width="90">
            <template #default="{ row }">
              <el-tag :type="tagType(row.status)" size="small">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </div>
  </div>
</template>
