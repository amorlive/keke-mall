<template>
  <div class="admin-page">
    <div class="filter-bar">
      <input v-model="kw" placeholder="搜索用户" class="search-input" />
      <select v-model="level" class="select">
        <option value="">全部等级</option>
        <option>银卡</option>
        <option>金卡</option>
        <option>钻石</option>
      </select>
      <select v-model="dist" class="select">
        <option value="">是否分销</option>
        <option value="yes">是</option>
        <option value="no">否</option>
      </select>
    </div>

    <div class="stat-row">
      <div class="stat-card"><div class="sl">总用户</div><div class="sv">186</div></div>
      <div class="stat-card"><div class="sl">今日新增</div><div class="sv">12</div></div>
      <div class="stat-card"><div class="sl">分销员</div><div class="sv">23</div></div>
      <div class="stat-card"><div class="sl">月活用户</div><div class="sv">86</div></div>
    </div>

    <div class="data-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>用户</th>
            <th>手机</th>
            <th>等级</th>
            <th>积分</th>
            <th>订单数</th>
            <th>消费金额</th>
            <th>分销身份</th>
            <th>注册时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td>
              <div class="user-cell">
                <div class="uc-avatar">{{ u.avatar }}</div>
                <div class="uc-name">{{ u.name }}</div>
              </div>
            </td>
            <td>{{ u.phone }}</td>
            <td><span :class="['level', u.level]">{{ u.level }}</span></td>
            <td>{{ u.points }}</td>
            <td>{{ u.orders }}</td>
            <td><span class="amount">¥{{ u.amount }}</span></td>
            <td>
              <span v-if="u.dist" class="dist-tag">✓ 分销员</span>
              <span v-else class="text-muted">—</span>
            </td>
            <td class="time">{{ u.regTime }}</td>
            <td>
              <a class="op">详情</a>
              <a class="op">发消息</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const kw = ref('')
const level = ref('')
const dist = ref('')

const users = [
  { id: 1, avatar: '🌸', name: '可可不加班', phone: '138****8888', level: '银卡', points: 286, orders: 12, amount: '1,256', dist: true, regTime: '2026-08-15' },
  { id: 2, avatar: '🌺', name: '小米', phone: '139****6666', level: '金卡', points: 580, orders: 24, amount: '3,120', dist: true, regTime: '2026-08-10' },
  { id: 3, avatar: '🌼', name: 'Lisa', phone: '137****5555', level: '银卡', points: 198, orders: 8, amount: '856', dist: false, regTime: '2026-08-22' },
  { id: 4, avatar: '💐', name: '阿月', phone: '136****4444', level: '钻石', points: 1200, orders: 38, amount: '5,860', dist: true, regTime: '2026-07-15' },
  { id: 5, avatar: '🌷', name: '糖糖', phone: '135****3333', level: '银卡', points: 96, orders: 5, amount: '420', dist: false, regTime: '2026-09-01' }
]
</script>

<style lang="scss" scoped>
.admin-page { display: flex; flex-direction: column; gap: 12px; }
.filter-bar { display: flex; gap: 8px; align-items: center; }
.search-input, .select { padding: 8px 12px; border: 1px solid #E5DFD3; border-radius: 4px; background: #fff; font-size: 13px; outline: none; }
.search-input { width: 200px; }

.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.stat-card { background: #fff; border-radius: 8px; padding: 14px; }
.sl { font-size: 12px; color: var(--color-ink-3); }
.sv { font-size: 22px; font-weight: 700; font-family: var(--font-serif); color: var(--color-primary); margin-top: 4px; }

.data-card { background: #fff; border-radius: 8px; overflow: hidden; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { background: var(--color-bg); padding: 12px; text-align: left; font-weight: 500; color: var(--color-ink-2); border-bottom: 1px solid #E5DFD3; }
.data-table td { padding: 12px; border-bottom: 1px solid #F0EDE6; }

.user-cell { display: flex; align-items: center; gap: 8px; }
.uc-avatar { width: 32px; height: 32px; background: var(--color-primary-50); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.uc-name { font-weight: 500; }

.level { padding: 2px 6px; border-radius: 3px; font-size: 11px; &.银卡 { background: var(--color-bg-3); color: var(--color-ink-2); } &.金卡 { background: #F0E6D5; color: #A88845; } &.钻石 { background: #C0E0F0; color: #2B5A8E; } }
.amount { color: var(--color-primary); font-weight: 600; }
.dist-tag { color: var(--color-primary); font-size: 11px; padding: 1px 5px; background: var(--color-primary-50); border-radius: 3px; }
.text-muted { color: var(--color-ink-3); }
.time { color: var(--color-ink-3); font-size: 12px; }
.op { color: var(--color-primary); margin-right: 10px; cursor: pointer; &:hover { text-decoration: underline; } }
</style>
