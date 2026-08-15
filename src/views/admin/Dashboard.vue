<template>
  <div class="dashboard">
    <!-- 顶部数据卡 -->
    <div class="kpi-grid">
      <div class="kpi-card" v-for="k in kpis" :key="k.label">
        <div class="kpi-label">{{ k.label }}</div>
        <div class="kpi-val">{{ k.val }}</div>
        <div class="kpi-trend" :class="k.trend > 0 ? 'up' : 'down'">
          {{ k.trend > 0 ? '↑' : '↓' }} {{ Math.abs(k.trend) }}% 较昨日
        </div>
      </div>
    </div>

    <!-- 图表区 -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="cc-header">
          <div class="cc-title">📈 销售趋势（近 7 天）</div>
          <div class="cc-tag">实时</div>
        </div>
        <div class="chart-area">
          <div v-for="(d, i) in salesTrend" :key="i" class="bar-wrap">
            <div class="bar-val">¥{{ d.val }}</div>
            <div class="bar" :style="{ height: d.percent + '%' }"></div>
            <div class="bar-label">{{ d.day }}</div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="cc-header">
          <div class="cc-title">🥧 销售渠道占比</div>
        </div>
        <div class="pie-area">
          <div class="pie" :style="{ background: pieBg }"></div>
          <div class="pie-legend">
            <div class="pl-item" v-for="(p, i) in pieData" :key="i">
              <span class="pl-dot" :style="{ background: p.color }"></span>
              <span class="pl-name">{{ p.name }}</span>
              <span class="pl-val">{{ p.percent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 热销商品 + 待办 -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="cc-header">
          <div class="cc-title">🏆 热销商品 TOP 5</div>
        </div>
        <div class="rank-list">
          <div v-for="(g, i) in topGoods" :key="g.id" class="rank-item">
            <div class="rank-no" :class="`top-${i + 1}`">{{ i + 1 }}</div>
            <img :src="g.cover" class="rank-img" />
            <div class="rank-info">
              <div class="rank-name">{{ g.name }}</div>
              <div class="rank-meta">销量 {{ g.sales }} · 库存 {{ g.stock }}</div>
            </div>
            <div class="rank-price">¥{{ g.price }}</div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="cc-header">
          <div class="cc-title">📋 待办事项</div>
          <div class="cc-tag">5 项</div>
        </div>
        <div class="todo-list">
          <div class="todo-item" v-for="t in todos" :key="t.title">
            <div class="todo-icon" :style="{ background: t.bg }">{{ t.icon }}</div>
            <div class="todo-info">
              <div class="todo-title">{{ t.title }}</div>
              <div class="todo-sub">{{ t.sub }}</div>
            </div>
            <div class="todo-go">›</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { goodsList } from '@/data/mock'

const kpis = [
  { label: '今日订单', val: '23', trend: 12 },
  { label: '今日销售额', val: '¥2,156', trend: 8 },
  { label: '今日访客', val: '486', trend: 25 },
  { label: '转化率', val: '4.7%', trend: -2 }
]

const salesTrend = [
  { day: '周一', val: 1280, percent: 50 },
  { day: '周二', val: 1560, percent: 60 },
  { day: '周三', val: 980, percent: 38 },
  { day: '周四', val: 1820, percent: 70 },
  { day: '周五', val: 2340, percent: 90 },
  { day: '周六', val: 2680, percent: 100 },
  { day: '今日', val: 2156, percent: 82 }
]

const pieData = [
  { name: '普通购买', percent: 45, color: '#7A2E2A' },
  { name: '拼团', percent: 30, color: '#C9A961' },
  { name: '接龙', percent: 20, color: '#6B8E6B' },
  { name: '分销', percent: 5, color: '#5C4D3F' }
]

const pieBg = computed(() => {
  const total = pieData.reduce((s, p) => s + p.percent, 0)
  let cur = 0
  const stops = pieData.map(p => {
    const start = (cur / total) * 360
    cur += p.percent
    const end = (cur / total) * 360
    return `${p.color} ${start}deg ${end}deg`
  })
  return `conic-gradient(${stops.join(', ')})`
})

const topGoods = computed(() => [...goodsList].sort((a, b) => b.sales - a.sales).slice(0, 5))

const todos = [
  { icon: '📦', bg: '#FBF1EF', title: '5 个订单待发货', sub: '请尽快处理发货' },
  { icon: '🛍️', bg: '#F0E6D5', title: '2 件商品库存不足', sub: '朱砂发卡 / 玉兰簪子' },
  { icon: '🐉', bg: '#E8F0E8', title: '1 个接龙即将截单', sub: '春日发卡专场，8 小时后' },
  { icon: '💬', bg: '#E8F0F0', title: '3 条用户评价待回复', sub: '建议 24 小时内回复' },
  { icon: '💰', bg: '#F0E0E0', title: '¥86 提现申请待处理', sub: '来自分销员 小米' }
]
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.kpi-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  border-left: 3px solid var(--color-primary);
}

.kpi-label { font-size: 12px; color: var(--color-ink-3); }
.kpi-val { font-size: 24px; font-weight: 700; color: var(--color-ink); margin: 6px 0 4px; font-family: var(--font-serif); }
.kpi-trend { font-size: 11px; &.up { color: var(--color-success); } &.down { color: var(--color-danger); } }

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.chart-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.cc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5DFD3;
}

.cc-title { font-size: 14px; font-weight: 600; color: var(--color-ink); }
.cc-tag { font-size: 11px; padding: 2px 6px; background: var(--color-primary-50); color: var(--color-primary); border-radius: 3px; }

.chart-area {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 180px;
  padding: 0 8px;
}

.bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.bar-val { font-size: 10px; color: var(--color-ink-3); }
.bar { width: 60%; background: linear-gradient(180deg, var(--color-primary), var(--color-primary-light)); border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.5s; }
.bar-label { font-size: 11px; color: var(--color-ink-3); }

.pie-area { display: flex; align-items: center; gap: 20px; }
.pie { width: 140px; height: 140px; border-radius: 50%; flex-shrink: 0; }
.pie-legend { flex: 1; }
.pl-item { display: flex; align-items: center; gap: 8px; padding: 5px 0; font-size: 12px; }
.pl-dot { width: 10px; height: 10px; border-radius: 50%; }
.pl-name { flex: 1; }
.pl-val { color: var(--color-primary); font-weight: 600; }

.rank-list { display: flex; flex-direction: column; gap: 8px; }
.rank-item { display: flex; align-items: center; gap: 10px; padding: 6px; border-radius: 6px; &:hover { background: var(--color-bg); } }
.rank-no { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; background: var(--color-bg-3); color: var(--color-ink-2); &.top-1 { background: var(--color-gold); color: #fff; } &.top-2 { background: #C0C0C0; color: #fff; } &.top-3 { background: #CD7F32; color: #fff; } }
.rank-img { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; }
.rank-info { flex: 1; }
.rank-name { font-size: 13px; font-weight: 500; line-height: 1.3; }
.rank-meta { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
.rank-price { color: var(--color-primary); font-weight: 600; font-size: 13px; }

.todo-list { display: flex; flex-direction: column; gap: 8px; }
.todo-item { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 6px; background: var(--color-bg); }
.todo-icon { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
.todo-info { flex: 1; }
.todo-title { font-size: 13px; font-weight: 500; }
.todo-sub { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }
.todo-go { color: var(--color-ink-3); font-size: 18px; }
</style>
