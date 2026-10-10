import type { EChartsOption } from 'echarts'
import type { RankItem } from './model'
import { trendLabels } from './model'

const axis = '#7dd3fc'
const split = 'rgba(125, 211, 252, 0.12)'

export function trendOption(values: number[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: 42, right: 12, top: 18, bottom: 24 },
    xAxis: { type: 'category', data: trendLabels, axisLabel: { color: '#94a3b8', fontSize: 11 }, axisLine: { lineStyle: { color: split } } },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' }, splitLine: { lineStyle: { color: split } } },
    series: [{
      type: 'line',
      smooth: true,
      data: values,
      symbol: 'circle',
      symbolSize: 7,
      lineStyle: { width: 3, color: '#38bdf8' },
      itemStyle: { color: '#38bdf8' },
      areaStyle: { color: 'rgba(56, 189, 248, 0.18)' },
    }],
  }
}

export function rankOption(ranks: RankItem[]): EChartsOption {
  const rows = [...ranks].reverse()
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: 118, right: 24, top: 8, bottom: 8 },
    xAxis: { type: 'value', axisLabel: { show: false }, splitLine: { show: false } },
    yAxis: { type: 'category', data: rows.map((item) => item.name), axisLabel: { color: '#e2e8f0', fontSize: 12 }, axisLine: { show: false }, axisTick: { show: false } },
    series: [{
      type: 'bar',
      data: rows.map((item) => item.value),
      barWidth: 12,
      itemStyle: { borderRadius: 6, color: '#22d3ee' },
      label: { show: true, position: 'right', color: axis, fontSize: 12 },
    }],
  }
}

export function channelOption(channels: RankItem[]): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: '#cbd5e1' } },
    series: [{
      type: 'pie',
      radius: ['46%', '68%'],
      center: ['50%', '44%'],
      label: { color: '#e2e8f0', formatter: '{b}\n{d}%' },
      data: channels,
    }],
  }
}

export function gaugeOption(name: string, value: number): EChartsOption {
  return {
    series: [{
      type: 'gauge',
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      progress: { show: true, width: 10, itemStyle: { color: '#38bdf8' } },
      axisLine: { lineStyle: { width: 10, color: [[1, 'rgba(148,163,184,0.2)']] } },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: { offsetCenter: [0, '78%'], color: '#94a3b8', fontSize: 13 },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '10%'],
        fontSize: 26,
        color: '#f8fafc',
        formatter: '{value}%',
      },
      data: [{ value, name }],
    }],
  }
}
