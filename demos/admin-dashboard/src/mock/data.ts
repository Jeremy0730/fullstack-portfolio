export type UserStatus = 'active' | 'disabled'

export interface UserRow {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: UserStatus
  lastLogin: string
}

export interface RoleRow {
  id: number
  name: string
  code: string
  description: string
  members: number
  permissions: string[]
}

export type OrderStatus = '待支付' | '待发货' | '配送中' | '已完成' | '已取消'

export interface OrderItem {
  name: string
  qty: number
  price: number
}

export interface OrderRow {
  id: string
  store: string
  customer: string
  amount: number
  channel: string
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}

export const roleNames = ['超级管理员', '区域运营', '门店店长', '财务', '客服']
export const departments = ['总部', '华东区', '华北区', '华南区', '西南区']
export const permissionOptions = [
  '查看看板',
  '导出报表',
  '管理用户',
  '分配角色',
  '处理订单',
  '查看财务',
  '配置门店',
]

export const users: UserRow[] = [
  { id: 1, name: '林可', email: 'lin.ke@northline.demo', role: '超级管理员', department: '总部', status: 'active', lastLogin: '2026-10-10 08:12' },
  { id: 2, name: '周衡', email: 'zhou.heng@northline.demo', role: '区域运营', department: '华东区', status: 'active', lastLogin: '2026-10-10 07:46' },
  { id: 3, name: '苏晚', email: 'su.wan@northline.demo', role: '门店店长', department: '华东区', status: 'active', lastLogin: '2026-10-09 21:18' },
  { id: 4, name: '陈屿', email: 'chen.yu@northline.demo', role: '财务', department: '总部', status: 'active', lastLogin: '2026-10-09 18:02' },
  { id: 5, name: '赵启明', email: 'zhao.qm@northline.demo', role: '客服', department: '华北区', status: 'active', lastLogin: '2026-10-10 09:01' },
  { id: 6, name: '吴棠', email: 'wu.tang@northline.demo', role: '门店店长', department: '华南区', status: 'disabled', lastLogin: '2026-09-28 11:20' },
  { id: 7, name: '郑北', email: 'zheng.bei@northline.demo', role: '区域运营', department: '西南区', status: 'active', lastLogin: '2026-10-08 16:44' },
  { id: 8, name: '何清', email: 'he.qing@northline.demo', role: '客服', department: '华南区', status: 'active', lastLogin: '2026-10-10 08:55' },
  { id: 9, name: '马川', email: 'ma.chuan@northline.demo', role: '门店店长', department: '华北区', status: 'active', lastLogin: '2026-10-07 19:33' },
  { id: 10, name: '许安', email: 'xu.an@northline.demo', role: '财务', department: '华东区', status: 'disabled', lastLogin: '2026-09-30 10:08' },
]

export const roles: RoleRow[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'owner',
    description: '全部门店与财务数据',
    members: 1,
    permissions: [...permissionOptions],
  },
  {
    id: 2,
    name: '区域运营',
    code: 'region_ops',
    description: '负责一个区域内的门店经营',
    members: 2,
    permissions: ['查看看板', '导出报表', '处理订单', '配置门店'],
  },
  {
    id: 3,
    name: '门店店长',
    code: 'store_lead',
    description: '只看自己门店的订单和排班',
    members: 3,
    permissions: ['查看看板', '处理订单'],
  },
  {
    id: 4,
    name: '财务',
    code: 'finance',
    description: '对账、退款和报表导出',
    members: 2,
    permissions: ['查看看板', '导出报表', '查看财务'],
  },
  {
    id: 5,
    name: '客服',
    code: 'support',
    description: '处理异常单和顾客备注',
    members: 2,
    permissions: ['查看看板', '处理订单'],
  },
]

export const orders: OrderRow[] = [
  {
    id: 'NL20261010086',
    store: '上海前滩店',
    customer: '顾小姐',
    amount: 268,
    channel: '小程序',
    status: '配送中',
    createdAt: '2026-10-10 09:24',
    items: [
      { name: '手冲耶加雪菲', qty: 2, price: 42 },
      { name: '提拉米苏', qty: 1, price: 36 },
      { name: '午餐套餐', qty: 2, price: 74 },
    ],
  },
  {
    id: 'NL20261010085',
    store: '杭州湖滨店',
    customer: '沈先生',
    amount: 156,
    channel: '美团',
    status: '待发货',
    createdAt: '2026-10-10 09:18',
    items: [
      { name: '招牌牛肉面', qty: 2, price: 48 },
      { name: '冰美式', qty: 2, price: 30 },
    ],
  },
  {
    id: 'NL20261010084',
    store: '成都太古里店',
    customer: '唐小姐',
    amount: 89,
    channel: '门店',
    status: '已完成',
    createdAt: '2026-10-10 08:56',
    items: [{ name: 'brunch 套餐', qty: 1, price: 89 }],
  },
  {
    id: 'NL20261010083',
    store: '深圳湾店',
    customer: '梁先生',
    amount: 420,
    channel: '京东到家',
    status: '待支付',
    createdAt: '2026-10-10 08:41',
    items: [
      { name: '家庭咖啡豆 1kg', qty: 2, price: 168 },
      { name: '滤杯', qty: 1, price: 84 },
    ],
  },
  {
    id: 'NL20261010082',
    store: '北京三里屯店',
    customer: '乔女士',
    amount: 64,
    channel: '小程序',
    status: '已取消',
    createdAt: '2026-10-10 08:12',
    items: [{ name: '燕麦拿铁', qty: 2, price: 32 }],
  },
  {
    id: 'NL20261009077',
    store: '南京新街口店',
    customer: '韩先生',
    amount: 312,
    channel: '门店',
    status: '已完成',
    createdAt: '2026-10-09 19:22',
    items: [
      { name: '双人下午茶', qty: 1, price: 198 },
      { name: '蛋糕切片', qty: 2, price: 57 },
    ],
  },
  {
    id: 'NL20261009071',
    store: '武汉光谷店',
    customer: '冯小姐',
    amount: 47,
    channel: '美团',
    status: '已完成',
    createdAt: '2026-10-09 12:05',
    items: [{ name: '鸡肉卷套餐', qty: 1, price: 47 }],
  },
  {
    id: 'NL20261008066',
    store: '西安大唐不夜城店',
    customer: '曹先生',
    amount: 188,
    channel: '小程序',
    status: '已完成',
    createdAt: '2026-10-08 20:16',
    items: [{ name: '城市限定礼盒', qty: 1, price: 188 }],
  },
]

export const revenueSeries = [186, 172, 194, 210, 198, 236, 228]
export const revenueDays = ['10/04', '10/05', '10/06', '10/07', '10/08', '10/09', '10/10']
export const channelShare = [
  { name: '小程序', value: 36 },
  { name: '门店', value: 28 },
  { name: '美团', value: 22 },
  { name: '京东到家', value: 14 },
]
export const categorySales = [
  { name: '咖啡', value: 420 },
  { name: '轻食', value: 310 },
  { name: '烘焙', value: 186 },
  { name: '零售豆', value: 142 },
  { name: '礼盒', value: 96 },
]
