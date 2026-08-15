<template>
  <div class="admin-page">
    <div class="filter-bar">
      <select v-model="status" class="select">
        <option value="">全部状态</option>
        <option>进行中</option>
        <option>已截止</option>
        <option>已截单</option>
      </select>
      <input v-model="kw" placeholder="搜索标题 / 发起人" class="search-input" />
      <button class="add-btn" @click="$router.push('/jielong/create')">+ 发起新接龙</button>
    </div>

    <div class="stat-row">
      <div class="stat-card"><div class="sl">进行中</div><div class="sv">3</div></div>
      <div class="stat-card"><div class="sl">本月接龙数</div><div class="sv">12</div></div>
      <div class="stat-card"><div class="sl">接龙订单</div><div class="sv">86</div></div>
      <div class="stat-card"><div class="sl">接龙销售额</div><div class="sv">¥4,230</div></div>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>接龙 ID</th>
            <th>标题</th>
            <th>商品</th>
            <th>接龙价</th>
            <th>进度</th>
            <th>发起人</th>
            <th>截止时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="j in list" :key="j.id">
            <td><span class="jid">{{ j.id }}</span></td>
            <td><div class="jtitle">{{ j.title }}</div></td>
            <td>
              <div class="goods-cell">
                <img :src="j.cover" />
                <div class="gc-name">{{ j.goodsName }}</div>
              </div>
            </td>
            <td><span class="price">¥{{ j.price }}</span></td>
            <td>
              <div class="progress">
                <div class="p-bar"><div class="p-fill" :style="{ width: (j.current / j.target * 100) + '%' }"></div></div>
                <div class="p-text">{{ j.current }}/{{ j.target }}</div>
              </div>
            </td>
            <td>{{ j.initiator }}</td>
            <td class="time">{{ j.deadline }}</td>
            <td><span :class="['status', j.status]">{{ j.status }}</span></td>
            <td>
              <a class="op">详情</a>
              <a v-if="j.status === '进行中'" class="op primary">分享推广</a>
              <a v-if="j.status === '进行中'" class="op danger">强制截单</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { findGoods } from '@/data/mock'

const status = ref('')
const kw = ref('')

const list = ref([
  { id: 'j2026090801', title: '【可可手作】春日宋锦发卡专场', goodsName: '锦绣 · 朱砂发卡', cover: findGoods(1).cover, price: 35, current: 12, target: 30, initiator: '可可不加班', deadline: '2026-09-08 22:00', status: '进行中' },
  { id: 'j2026090802', title: '母亲节宋锦礼盒接龙', goodsName: '锦上添花 · 套装', cover: findGoods(8).cover, price: 179, current: 23, target: 50, initiator: '可可不加班', deadline: '2026-09-09 12:00', status: '进行中' },
  { id: 'j2026090503', title: '【手作新店首发】缠枝手链', goodsName: '缠枝 · 宋锦手链', cover: findGoods(3).cover, price: 78, current: 20, target: 20, initiator: '可可不加班', deadline: '2026-09-06 18:00', status: '已截单' },
  { id: 'j2026090104', title: '【中秋特辑】宋锦发卡', goodsName: '流光 · 简约发卡', cover: findGoods(9).cover, price: 22, current: 8, target: 30, initiator: '可可不加班', deadline: '2026-09-02 20:00', status: '已截止' }
])
</script>

<style lang="scss" scoped>
.admin-page { display: flex; flex-direction: column; gap: 12px; }
.filter-bar { display: flex; gap: 8px; align-items: center; }
.search-input, .select { padding: 8px 12px; border: 1px solid #E5DFD3; border-radius: 4px; background: #fff; font-size: 13px; outline: none; }
.search-input { flex: 1; max-width: 240px; }
.add-btn { padding: 8px 16px; background: var(--color-primary); color: #fff; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; margin-left: auto; }

.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.stat-card { background: #fff; border-radius: 8px; padding: 14px; }
.sl { font-size: 12px; color: var(--color-ink-3); }
.sv { font-size: 22px; font-weight: 700; font-family: var(--font-serif); color: var(--color-primary); margin-top: 4px; }

.data-card { background: #fff; border-radius: 8px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: var(--color-bg); padding: 12px; text-align: left; font-weight: 500; color: var(--color-ink-2); border-bottom: 1px solid #E5DFD3; }
.data-table td { padding: 12px; border-bottom: 1px solid #F0EDE6; }
.jid { font-family: monospace; font-size: 12px; }
.jtitle { font-weight: 500; max-width: 200px; }
.goods-cell { display: flex; align-items: center; gap: 10px; img { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; } }
.gc-name { font-weight: 500; }
.price { color: var(--color-primary); font-weight: 600; }
.progress { display: flex; align-items: center; gap: 6px; }
.p-bar { width: 80px; height: 6px; background: var(--color-bg-3); border-radius: 3px; overflow: hidden; }
.p-fill { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-primary)); border-radius: 3px; }
.p-text { font-size: 11px; color: var(--color-ink-3); }
.time { color: var(--color-ink-3); font-size: 12px; }
.status { padding: 2px 6px; border-radius: 3px; font-size: 11px; &.进行中 { background: #E8F0E8; color: #4A6B4A; } &.已截单 { background: #FBF1EF; color: var(--color-primary); } &.已截止 { background: var(--color-bg-3); color: var(--color-ink-3); } }
.op { color: var(--color-primary); margin-right: 10px; cursor: pointer; &.primary { font-weight: 600; } &.danger { color: var(--color-danger); } &:hover { text-decoration: underline; } }
</style>
