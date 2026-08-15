<template>
  <div class="admin-page">
    <div class="filter-bar">
      <input v-model="kw" placeholder="搜索订单号 / 收货人" class="search-input" />
      <select v-model="status" class="select">
        <option value="">全部状态</option>
        <option>待付款</option>
        <option>待发货</option>
        <option>待收货</option>
        <option>已完成</option>
        <option>已取消</option>
      </select>
      <select v-model="type" class="select">
        <option value="">全部类型</option>
        <option>普通订单</option>
        <option>拼团订单</option>
        <option>接龙订单</option>
      </select>
      <button class="export-btn">📥 导出</button>
    </div>

    <div class="stat-row">
      <div class="stat-card"><div class="sl">今日订单</div><div class="sv">23</div></div>
      <div class="stat-card"><div class="sl">待发货</div><div class="sv">5</div></div>
      <div class="stat-card"><div class="sl">待付款</div><div class="sv">3</div></div>
      <div class="stat-card"><div class="sl">本月销售额</div><div class="sv">¥18,562</div></div>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>商品</th>
            <th>金额</th>
            <th>类型</th>
            <th>收货人</th>
            <th>状态</th>
            <th>下单时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in orders" :key="o.id">
            <td><span class="order-id">{{ o.id }}</span></td>
            <td>
              <div class="goods-cell">
                <img :src="o.cover" />
                <div>
                  <div class="gc-name">{{ o.goodsName }}</div>
                  <div class="gc-qty">× {{ o.count }}</div>
                </div>
              </div>
            </td>
            <td><span class="price">¥{{ o.total }}</span></td>
            <td><span :class="['type', o.type]">{{ o.type }}</span></td>
            <td>{{ o.buyer }}</td>
            <td><span :class="['status', o.status]">{{ o.status }}</span></td>
            <td class="time">{{ o.createTime }}</td>
            <td>
              <a class="op">详情</a>
              <a v-if="o.status === '待发货'" class="op primary">发货</a>
              <a v-if="o.status === '待付款'" class="op">提醒</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { orders as orderData, findGoods } from '@/data/mock'

const kw = ref('')
const status = ref('')
const type = ref('')

const orders = ref([
  { id: 'o20260908001', goodsId: 1, goodsName: '锦绣 · 朱砂发卡', cover: findGoods(1).cover, total: 39, count: 1, type: '普通订单', buyer: '可可 138****8888', status: '待发货', createTime: '2026-09-08 10:23' },
  { id: 'o20260908002', goodsId: 8, goodsName: '锦上添花 · 套装', cover: findGoods(8).cover, total: 199, count: 1, type: '拼团订单', buyer: '小米 139****6666', status: '待发货', createTime: '2026-09-08 09:50' },
  { id: 'o20260908003', goodsId: 3, goodsName: '缠枝 · 宋锦手链', cover: findGoods(3).cover, total: 88, count: 1, type: '接龙订单', buyer: 'Lisa 137****5555', status: '待付款', createTime: '2026-09-08 09:15' },
  { id: 'o20260907004', goodsId: 5, goodsName: '玉兰 · 古典发簪', cover: findGoods(5).cover, total: 68, count: 2, type: '普通订单', buyer: '阿月 136****4444', status: '待收货', createTime: '2026-09-07 16:30' },
  { id: 'o20260907005', goodsId: 1, goodsName: '锦绣 · 朱砂发卡', cover: findGoods(1).cover, total: 29, count: 1, type: '拼团订单', buyer: '糖糖 135****3333', status: '已完成', createTime: '2026-09-07 15:42' }
])
</script>

<style lang="scss" scoped>
.admin-page { display: flex; flex-direction: column; gap: 12px; }
.filter-bar { display: flex; gap: 8px; align-items: center; }
.search-input, .select { padding: 8px 12px; border: 1px solid #E5DFD3; border-radius: 4px; background: #fff; font-size: 13px; outline: none; }
.search-input { flex: 1; max-width: 240px; }
.export-btn { padding: 8px 16px; background: var(--color-bg-2); color: var(--color-ink); border: 1px solid #E5DFD3; border-radius: 4px; font-size: 13px; cursor: pointer; margin-left: auto; }

.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.stat-card { background: #fff; border-radius: 8px; padding: 14px; }
.sl { font-size: 12px; color: var(--color-ink-3); }
.sv { font-size: 22px; font-weight: 700; font-family: var(--font-serif); color: var(--color-primary); margin-top: 4px; }

.data-card { background: #fff; border-radius: 8px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: var(--color-bg); padding: 12px; text-align: left; font-weight: 500; color: var(--color-ink-2); border-bottom: 1px solid #E5DFD3; }
.data-table td { padding: 12px; border-bottom: 1px solid #F0EDE6; }
.data-table tr:hover { background: var(--color-bg); }

.order-id { font-family: monospace; font-size: 12px; }
.goods-cell { display: flex; align-items: center; gap: 10px; img { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; } }
.gc-name { font-weight: 500; }
.gc-qty { font-size: 11px; color: var(--color-ink-3); }
.price { color: var(--color-primary); font-weight: 600; }

.type { padding: 2px 6px; border-radius: 3px; font-size: 11px; &.拼团订单 { background: #FBF1EF; color: var(--color-primary); } &.接龙订单 { background: #E8F0E8; color: #4A6B4A; } &.普通订单 { background: var(--color-bg-3); color: var(--color-ink-2); } }

.status { padding: 2px 6px; border-radius: 3px; font-size: 11px; &.待付款 { background: #F0E6D5; color: var(--color-gold); } &.待发货 { background: #FBF1EF; color: var(--color-primary); } &.待收货 { background: #E8F0F0; color: #4A6B8E; } &.已完成 { background: var(--color-bg-3); color: var(--color-ink-3); } }
.time { color: var(--color-ink-3); font-size: 12px; }

.op { color: var(--color-primary); margin-right: 10px; cursor: pointer; &.primary { font-weight: 600; } &:hover { text-decoration: underline; } }
</style>
