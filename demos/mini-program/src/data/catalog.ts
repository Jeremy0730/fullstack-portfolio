export interface Review {
  user: string
  score: number
  text: string
}

export interface Product {
  id: string
  name: string
  category: '咖啡' | '轻食' | '烘焙' | '零售'
  price: number
  origin: number
  sales: number
  blurb: string
  story: string
  tone: string
  reviews: Review[]
}

export interface Coupon {
  id: string
  title: string
  detail: string
  min: number
  kind: 'off' | 'rate'
  value: number
}

export const categories = ['全部', '咖啡', '轻食', '烘焙', '零售'] as const

export const products: Product[] = [
  {
    id: 'yirga',
    name: '手冲耶加雪菲',
    category: '咖啡',
    price: 42,
    origin: 48,
    sales: 326,
    blurb: '柑橘和花香，前滩店日销第一',
    story: '单品手冲，默认中浅烘焙。可备注少冰或换成燕麦奶。演示商品，不下真单。',
    tone: '#7c3a1e',
    reviews: [
      { user: '顾青', score: 5, text: '酸度清楚，不会苦。' },
      { user: '周衡', score: 4, text: '出杯稍慢，味道稳定。' },
    ],
  },
  {
    id: 'oat-latte',
    name: '燕麦拿铁',
    category: '咖啡',
    price: 32,
    origin: 36,
    sales: 510,
    blurb: '热饮或冰饮，默认燕麦奶',
    story: '浓缩双份。冰饮去冰请在确认页备注。适合作为小程序里的标准饮品。',
    tone: '#b45309',
    reviews: [{ user: '苏晚', score: 5, text: '燕麦味刚好，不抢咖啡。' }],
  },
  {
    id: 'beef-noodle',
    name: '招牌牛肉面',
    category: '轻食',
    price: 48,
    origin: 52,
    sales: 188,
    blurb: '午市套餐可加冰美式',
    story: '红烧汤底，默认微辣。演示里不接真实后厨，只走到下单成功。',
    tone: '#9a3412',
    reviews: [{ user: '沈川', score: 5, text: '汤不腻，面量够一个人。' }],
  },
  {
    id: 'chicken-wrap',
    name: '鸡肉卷套餐',
    category: '轻食',
    price: 47,
    origin: 47,
    sales: 143,
    blurb: '含小食和一瓶气泡水',
    story: '外卖场景的组合商品。结算时可以叠满减券。',
    tone: '#166534',
    reviews: [{ user: '何清', score: 4, text: '套餐划算，酱可以再少一点。' }],
  },
  {
    id: 'tiramisu',
    name: '提拉米苏',
    category: '烘焙',
    price: 36,
    origin: 39,
    sales: 96,
    blurb: '当日切片，建议配美式',
    story: '冷藏甜品。商品详情里放了两条评价，用来演示详情页结构。',
    tone: '#44403c',
    reviews: [{ user: '唐小姐', score: 5, text: '咖啡酒味不冲。' }],
  },
  {
    id: 'brunch',
    name: '双人早午餐',
    category: '烘焙',
    price: 89,
    origin: 108,
    sales: 74,
    blurb: '两杯咖啡加一份咸甜拼盘',
    story: '到店核销类商品。演示订单会记成“制作中”，不会生成取餐码接口。',
    tone: '#1d4ed8',
    reviews: [{ user: '林可', score: 5, text: '两个人刚好，不用再加点。' }],
  },
  {
    id: 'beans',
    name: '家庭咖啡豆 1kg',
    category: '零售',
    price: 168,
    origin: 188,
    sales: 41,
    blurb: '和门店同批次，可快递',
    story: '零售商品用来把客单价做高，方便演示满减券。',
    tone: '#3f3f46',
    reviews: [{ user: '梁先生', score: 4, text: '和店里的豆子一致。' }],
  },
  {
    id: 'gift',
    name: '城市限定礼盒',
    category: '零售',
    price: 188,
    origin: 218,
    sales: 28,
    blurb: '豆子、杯和一张门店券',
    story: '礼盒是高客单示例。地址簿里选收货人后即可走完结算。',
    tone: '#0f766e',
    reviews: [{ user: '曹先生', score: 5, text: '送礼够用，包装干净。' }],
  },
]

export const coupons: Coupon[] = [
  { id: 'minus15', title: '满 100 减 15', detail: '全场商品，结算时自动判断门槛', min: 100, kind: 'off', value: 15 },
  { id: 'rate88', title: '会员 88 折', detail: '满 60 可用，与满减二选一', min: 60, kind: 'rate', value: 0.88 },
  { id: 'new8', title: '新人立减 8 元', detail: '无门槛，适合第一杯咖啡', min: 0, kind: 'off', value: 8 },
]

export function findProduct(id: string) {
  return products.find((item) => item.id === id)
}
