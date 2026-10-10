import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { coupons as couponSeed, findProduct, type Coupon } from '@/data/catalog'

export interface Address {
  id: string
  name: string
  phone: string
  text: string
}

export interface CartLine {
  id: string
  qty: number
}

export type OrderStatus = '待支付' | '制作中' | '配送中' | '已完成'

export interface OrderLine {
  id: string
  name: string
  price: number
  qty: number
}

export interface ShopOrder {
  id: string
  status: OrderStatus
  lines: OrderLine[]
  goodsAmount: number
  payAmount: number
  couponTitle: string
  address: string
  payMethod: string
  note: string
  createdAt: string
}

const STORAGE_KEY = 'nl-mini'

interface Saved {
  cart: CartLine[]
  orders: ShopOrder[]
  addresses: Address[]
  addressId: string
  claimed: string[]
  couponId: string
}

const defaultAddresses: Address[] = [
  { id: 'a1', name: '顾青', phone: '13800001111', text: '上海市浦东新区前滩大道 100 号' },
  { id: 'a2', name: '林可', phone: '13900002222', text: '杭州市上城区湖滨路 28 号' },
]

function load(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) throw new Error('empty')
    return JSON.parse(raw) as Saved
  } catch {
    return {
      cart: [],
      orders: [],
      addresses: defaultAddresses,
      addressId: 'a1',
      claimed: ['minus15'],
      couponId: '',
    }
  }
}

export function money(value: number) {
  return `¥${value.toFixed(value % 1 === 0 ? 0 : 2)}`
}

export function couponSave(subtotal: number, coupon: Coupon | undefined) {
  if (!coupon || subtotal < coupon.min) return 0
  if (coupon.kind === 'off') return Math.min(coupon.value, subtotal)
  return Math.round(subtotal * (1 - coupon.value))
}

export const useShopStore = defineStore('shop', () => {
  const saved = load()
  const cart = ref<CartLine[]>(saved.cart)
  const orders = ref<ShopOrder[]>(saved.orders)
  const addresses = ref<Address[]>(saved.addresses)
  const addressId = ref(saved.addressId)
  const claimed = ref<string[]>(saved.claimed)
  const couponId = ref(saved.couponId)
  const toast = ref('')
  let toastTimer = 0

  const count = computed(() => cart.value.reduce((sum, line) => sum + line.qty, 0))
  const lines = computed(() =>
    cart.value
      .map((line) => {
        const product = findProduct(line.id)
        return product ? { product, qty: line.qty } : null
      })
      .filter((line): line is { product: NonNullable<ReturnType<typeof findProduct>>; qty: number } => line !== null),
  )
  const goodsAmount = computed(() => lines.value.reduce((sum, line) => sum + line.product.price * line.qty, 0))
  const ownedCoupons = computed(() => couponSeed.filter((item) => claimed.value.includes(item.id)))
  const activeCoupon = computed(() => ownedCoupons.value.find((item) => item.id === couponId.value))
  const discount = computed(() => couponSave(goodsAmount.value, activeCoupon.value))
  const payAmount = computed(() => Math.max(0, goodsAmount.value - discount.value))
  const currentAddress = computed(() => addresses.value.find((item) => item.id === addressId.value) ?? addresses.value[0])

  function notify(message: string) {
    toast.value = message
    window.clearTimeout(toastTimer)
    toastTimer = window.setTimeout(() => {
      toast.value = ''
    }, 1600)
  }

  function add(id: string, qty = 1) {
    const line = cart.value.find((item) => item.id === id)
    if (line) line.qty += qty
    else cart.value.push({ id, qty })
    const product = findProduct(id)
    notify(product ? `已加入购物车 · ${product.name}` : '已加入购物车')
  }

  function setQty(id: string, qty: number) {
    const line = cart.value.find((item) => item.id === id)
    if (!line) return
    if (qty <= 0) cart.value = cart.value.filter((item) => item.id !== id)
    else line.qty = qty
  }

  function claim(id: string) {
    if (!claimed.value.includes(id)) claimed.value.push(id)
    couponId.value = id
    notify('优惠券已领取，结算时可用')
  }

  function selectCoupon(id: string) {
    couponId.value = couponId.value === id ? '' : id
  }

  function addAddress(input: Omit<Address, 'id'>) {
    const id = `a${Date.now()}`
    addresses.value.push({ ...input, id })
    addressId.value = id
    notify('已保存地址')
  }

  function placeOrder(payMethod: string, note: string) {
    if (!lines.value.length || !currentAddress.value) return ''
    const id = `NL${Date.now().toString().slice(-8)}`
    const order: ShopOrder = {
      id,
      status: '制作中',
      lines: lines.value.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        price: line.product.price,
        qty: line.qty,
      })),
      goodsAmount: goodsAmount.value,
      payAmount: payAmount.value,
      couponTitle: discount.value > 0 && activeCoupon.value ? activeCoupon.value.title : '未使用',
      address: `${currentAddress.value.name} ${currentAddress.value.phone} ${currentAddress.value.text}`,
      payMethod,
      note,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    }
    orders.value.unshift(order)
    cart.value = []
    couponId.value = ''
    return id
  }

  function advance(id: string) {
    const order = orders.value.find((item) => item.id === id)
    if (!order) return
    const flow: OrderStatus[] = ['待支付', '制作中', '配送中', '已完成']
    const index = flow.indexOf(order.status)
    if (index >= 0 && index < flow.length - 1) order.status = flow[index + 1]
  }

  watch([cart, orders, addresses, addressId, claimed, couponId], () => {
    const payload: Saved = {
      cart: cart.value,
      orders: orders.value,
      addresses: addresses.value,
      addressId: addressId.value,
      claimed: claimed.value,
      couponId: couponId.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, { deep: true })

  return {
    cart, orders, addresses, addressId, claimed, couponId, toast,
    count, lines, goodsAmount, ownedCoupons, activeCoupon, discount, payAmount, currentAddress,
    notify, add, setQty, claim, selectCoupon, addAddress, placeOrder, advance,
  }
})
