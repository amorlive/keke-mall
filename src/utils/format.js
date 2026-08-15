// 工具函数
export function formatPrice(p) {
  return Number(p).toFixed(2)
}

export function timeLeft(target) {
  const diff = target - Date.now()
  if (diff <= 0) return '已结束'
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  if (h > 0) return `${h}小时${m}分`
  if (m > 0) return `${m}分${s}秒`
  return `${s}秒`
}

export function maskPhone(p) {
  if (!p) return ''
  return p.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 订单状态
export const orderStatus = {
  '待付款': { color: '#C9A961', tag: 'gold' },
  '待发货': { color: '#7A2E2A', tag: 'primary' },
  '待收货': { color: '#6B7E8E', tag: 'info' },
  '已完成': { color: '#8B7B6E', tag: 'default' },
  '已取消': { color: '#B23A3A', tag: 'danger' }
}
