export interface RankItem {
  name: string
  value: number
}

export interface FeedItem {
  id: string
  store: string
  amount: number
  status: string
}

export interface AlertItem {
  id: string
  level: '高' | '中' | '低'
  store: string
  text: string
  time: string
}

export interface ScreenState {
  gmv: number
  orders: number
  stores: number
  minutes: number
  exceptions: number
  trend: number[]
  ranks: RankItem[]
  channels: RankItem[]
  feed: FeedItem[]
  alerts: AlertItem[]
  goals: RankItem[]
}

const stores = ['上海前滩店', '杭州湖滨店', '成都太古里店', '深圳湾店', '北京三里屯店', '南京新街口店', '武汉光谷店', '西安大唐不夜城店']
const statuses = ['已接单', '制作中', '配送中']

function jitter(value: number, ratio: number) {
  return Math.max(0, Math.round(value + value * ratio * (Math.random() - 0.42)))
}

let sequence = 90

export function createInitial(): ScreenState {
  return {
    gmv: 1286400,
    orders: 3842,
    stores: 128,
    minutes: 28,
    exceptions: 17,
    trend: [86, 92, 88, 101, 97, 110, 108, 116, 121, 118, 130, 126, 138, 142],
    ranks: [
      { name: '上海前滩店', value: 186 },
      { name: '杭州湖滨店', value: 164 },
      { name: '成都太古里店', value: 151 },
      { name: '深圳湾店', value: 143 },
      { name: '北京三里屯店', value: 138 },
      { name: '南京新街口店', value: 121 },
      { name: '武汉光谷店', value: 109 },
      { name: '西安大唐不夜城店', value: 96 },
    ],
    channels: [
      { name: '小程序', value: 36 },
      { name: '门店', value: 28 },
      { name: '美团', value: 22 },
      { name: '京东到家', value: 14 },
    ],
    feed: [
      { id: 'NL086', store: '上海前滩店', amount: 268, status: '配送中' },
      { id: 'NL085', store: '杭州湖滨店', amount: 156, status: '制作中' },
      { id: 'NL084', store: '成都太古里店', amount: 89, status: '已接单' },
      { id: 'NL083', store: '深圳湾店', amount: 420, status: '已接单' },
      { id: 'NL082', store: '北京三里屯店', amount: 64, status: '配送中' },
      { id: 'NL081', store: '南京新街口店', amount: 132, status: '制作中' },
    ],
    alerts: [
      { id: 'a1', level: '高', store: '上海前滩店', text: '3 笔订单超过 40 分钟未送达', time: '09:21' },
      { id: 'a2', level: '中', store: '武汉光谷店', text: '招牌牛肉面库存低于安全线', time: '09:06' },
      { id: 'a3', level: '中', store: '深圳湾店', text: '支付失败率升至 4.8%', time: '08:47' },
      { id: 'a4', level: '低', store: '西安大唐不夜城店', text: '晚班还差 1 名咖啡师', time: '08:20' },
      { id: 'a5', level: '低', store: '南京新街口店', text: '差评 1 条待回访', time: '08:02' },
    ],
    goals: [
      { name: '销售目标', value: 76 },
      { name: '准时履约', value: 91 },
      { name: '好评率', value: 96 },
    ],
  }
}

export function tick(state: ScreenState): ScreenState {
  sequence += 1
  const store = stores[sequence % stores.length]
  const nextFeed: FeedItem = {
    id: `NL${String(sequence).padStart(3, '0')}`,
    store,
    amount: 40 + (sequence * 17) % 380,
    status: statuses[sequence % statuses.length],
  }
  const trend = state.trend.map((value, index) => (index === state.trend.length - 1 ? jitter(value, 0.02) : value))
  const ranks = state.ranks.map((item) => ({ ...item, value: jitter(item.value, 0.03) })).sort((a, b) => b.value - a.value)
  return {
    ...state,
    gmv: jitter(state.gmv, 0.003),
    orders: jitter(state.orders, 0.006),
    minutes: Math.min(36, Math.max(22, jitter(state.minutes, 0.04))),
    exceptions: Math.min(28, Math.max(8, jitter(state.exceptions, 0.08))),
    trend,
    ranks,
    feed: [nextFeed, ...state.feed].slice(0, 7),
    goals: state.goals.map((goal) => ({
      ...goal,
      value: Math.min(99, Math.max(70, jitter(goal.value, 0.01))),
    })),
  }
}

export function cny(value: number) {
  return `¥${value.toLocaleString('zh-CN')}`
}

export const trendLabels = ['9/27', '9/28', '9/29', '9/30', '10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10']
