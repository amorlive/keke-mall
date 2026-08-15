<template>
  <div class="admin-page">
    <div class="filter-bar">
      <select v-model="status" class="select">
        <option value="">全部状态</option>
        <option>进行中</option>
        <option>已成团</option>
        <option>已失败</option>
      </select>
      <input v-model="kw" placeholder="搜索商品 / 团长" class="search-input" />
      <button class="add-btn" @click="$router.push('/jielong/create')">+ 发起新拼团</button>
    </div>

    <div class="stat-row">
      <div class="stat-card"><div class="sl">进行中团</div><div class="sv">8</div></div>
      <div class="stat-card"><div class="sl">已成团数</div><div class="sv">56</div></div>
      <div class="stat-card"><div class="sl">拼团订单</div><div class="sv">168</div></div>
      <div class="stat-card"><div class="sl">拼团销售额</div><div class="sv">¥8,420</div></div>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>团 ID</th>
            <th>商品</th>
            <th>团购价</th>
            <th>进度</th>
            <th>团长</th>
            <th>结束时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="g in list" :key="g.id">
            <td><span class="gid">{{ g.id }}</span></td>
            <td>
              <div class="goods-cell">
                <img :src="g.cover" />
                <div class="gc-name">{{ g.name }}</div>
              </div>
            </td>
            <td><span class="price">¥{{ g.price }}</span></td>
            <td>
              <div class="progress">
                <div class="p-bar"><div class="p-fill" :style="{ width: (g.joined / g.peopleNeeded * 100) + '%' }"></div></div>
                <div class="p-text">{{ g.joined }}/{{ g.peopleNeeded }}</div>
              </div>
            </td>
            <td>{{ g.leader }}</td>
            <td class="time">{{ g.endTime }}</td>
            <td><span :class="['status', g.status]">{{ g.status }}</span></td>
            <td>
              <a class="op">详情</a>
              <a v-if="g.status === '进行中'" class="op">提醒</a>
              <a v-if="g.status === '进行中'" class="op danger">强制结束</a>
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
  { id: 'g' + Date.now() + '01', name: '朱砂发卡 2 人团', cover: findGoods(1).cover, price: 29, joined: 1, peopleNeeded: 2, leader: '可可', endTime: '2026-09-09 22:00', status: '进行中' },
  { id: 'g' + Date.now() + '02', name: '云锦抓夹 3 人团', cover: findGoods(2).cover, price: 35, joined: 2, peopleNeeded: 3, leader: '小米', endTime: '2026-09-09 18:00', status: '进行中' },
  { id: 'g' + Date.now() + '03', name: '缠枝手链 3 人团', cover: findGoods(3).cover, price: 68, joined: 3, peopleNeeded: 3, leader: 'Lisa', endTime: '2026-09-08 16:00', status: '已成团' },
  { id: 'g' + Date.now() + '04', name: '玉兰簪子 2 人团', cover: findGoods(5).cover, price: 49, joined: 1, peopleNeeded: 2, leader: '阿月', endTime: '2026-09-08 14:00', status: '已失败' }
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
.gid { font-family: monospace; font-size: 12px; }
.goods-cell { display: flex; align-items: center; gap: 10px; img { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; } }
.gc-name { font-weight: 500; }
.price { color: var(--color-primary); font-weight: 600; }
.progress { display: flex; align-items: center; gap: 6px; }
.p-bar { width: 80px; height: 6px; background: var(--color-bg-3); border-radius: 3px; overflow: hidden; }
.p-fill { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-primary)); border-radius: 3px; }
.p-text { font-size: 11px; color: var(--color-ink-3); }
.time { color: var(--color-ink-3); font-size: 12px; }
.status { padding: 2px 6px; border-radius: 3px; font-size: 11px; &.进行中 { background: #FBF1EF; color: var(--color-primary); } &.已成团 { background: #E8F0E8; color: #4A6B4A; } &.已失败 { background: var(--color-bg-3); color: var(--color-ink-3); } }
.op { color: var(--color-primary); margin-right: 10px; cursor: pointer; &.danger { color: var(--color-danger); } &:hover { text-decoration: underline; } }
</style>
