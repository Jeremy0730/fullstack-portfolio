import { useEffect, useMemo, useState } from 'react'
import { Chart } from './Chart'
import { cny, createInitial, tick } from './model'
import { channelOption, gaugeOption, rankOption, trendOption } from './options'

function formatClock(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0')
  const week = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 周${week} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function App() {
  const [scale, setScale] = useState(1)
  const [now, setNow] = useState(() => new Date())
  const [data, setData] = useState(createInitial)

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
    fit()
    window.addEventListener('resize', fit)
    const clock = window.setInterval(() => setNow(new Date()), 1000)
    const live = window.setInterval(() => setData((prev) => tick(prev)), 3000)
    return () => {
      window.removeEventListener('resize', fit)
      window.clearInterval(clock)
      window.clearInterval(live)
    }
  }, [])

  const trend = useMemo(() => trendOption(data.trend), [data.trend])
  const rank = useMemo(() => rankOption(data.ranks), [data.ranks])
  const channel = useMemo(() => channelOption(data.channels), [data.channels])
  const gauges = useMemo(
    () => data.goals.map((goal) => ({ name: goal.name, option: gaugeOption(goal.name, goal.value) })),
    [data.goals],
  )
  const aov = Math.round(data.gmv / data.orders)

  const kpis = [
    { label: '今日 GMV', value: cny(data.gmv), note: '含门店与外卖' },
    { label: '订单量', value: data.orders.toLocaleString('zh-CN'), note: '实时累计' },
    { label: '客单价', value: cny(aov), note: 'GMV / 订单' },
    { label: '在线门店', value: String(data.stores), note: '营业中' },
    { label: '平均履约', value: `${data.minutes} 分钟`, note: '下单到送达' },
    { label: '异常单', value: String(data.exceptions), note: '待人工处理' },
  ]

  return (
    <div className="viewport">
      <div className="screen" style={{ transform: `scale(${scale})` }}>
        <header className="top">
          <div className="brand">
            <span className="mark">N</span>
            <div>
              <strong>NORTHLINE</strong>
              <small>经营指挥中心</small>
            </div>
          </div>
          <h1>多门店实时经营</h1>
          <div className="clock">
            <span className="live">实时</span>
            <time>{formatClock(now)}</time>
          </div>
        </header>

        <section className="kpis">
          {kpis.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <small>{item.note}</small>
            </article>
          ))}
        </section>

        <section className="body">
          <div className="col">
            <article className="panel">
              <h2>近 14 日 GMV（万元）</h2>
              <Chart option={trend} />
            </article>
            <article className="panel">
              <h2>门店销售额 TOP</h2>
              <Chart option={rank} />
            </article>
          </div>
          <div className="col">
            <article className="panel gauges">
              <h2>今日目标</h2>
              <div className="gauge-row">
                {gauges.map((goal) => (
                  <Chart key={goal.name} option={goal.option} />
                ))}
              </div>
            </article>
            <article className="panel">
              <h2>最新订单</h2>
              <div className="feed">
                {data.feed.map((item) => (
                  <div key={item.id} className="feed-row">
                    <span>{item.id}</span>
                    <span>{item.store}</span>
                    <span>{cny(item.amount)}</span>
                    <em>{item.status}</em>
                  </div>
                ))}
              </div>
            </article>
          </div>
          <div className="col">
            <article className="panel">
              <h2>渠道占比</h2>
              <Chart option={channel} />
            </article>
            <article className="panel">
              <h2>异常提醒</h2>
              <div className="alerts">
                {data.alerts.map((item) => (
                  <div key={item.id} className="alert">
                    <b className={item.level === '高' ? 'high' : item.level === '中' ? 'mid' : 'low'}>{item.level}</b>
                    <div>
                      <strong>{item.store}</strong>
                      <p>{item.text}</p>
                    </div>
                    <time>{item.time}</time>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
        <footer>作品集演示数据，每 3 秒刷新一次样例波动，不连接真实门店。</footer>
      </div>
    </div>
  )
}
