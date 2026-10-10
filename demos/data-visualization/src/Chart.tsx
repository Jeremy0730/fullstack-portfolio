import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export function Chart({ option, className }: { option: echarts.EChartsOption; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const chart = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const instance = echarts.init(ref.current)
    chart.current = instance
    const onResize = () => instance.resize()
    window.addEventListener('resize', onResize)
    const frame = requestAnimationFrame(() => instance.resize())
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      instance.dispose()
      chart.current = null
    }
  }, [])

  useEffect(() => {
    chart.current?.setOption(option)
  }, [option])

  return <div ref={ref} className={className ?? 'chart'} />
}
