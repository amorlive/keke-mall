<template>
  <div class="admin-page">
    <div class="marketing-grid">
      <div class="mc-card" v-for="m in tools" :key="m.name">
        <div class="mc-icon" :style="{ background: m.bg }">{{ m.icon }}</div>
        <div class="mc-info">
          <div class="mc-name">{{ m.name }}</div>
          <div class="mc-desc">{{ m.desc }}</div>
        </div>
        <div class="mc-status">{{ m.status }}</div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="cc-title">🎯 营销活动效果</div>
        <div class="campaign-list">
          <div class="camp-item" v-for="c in campaigns" :key="c.name">
            <div class="ci-info">
              <div class="ci-name">{{ c.name }}</div>
              <div class="ci-sub">{{ c.time }} · 转化率 {{ c.cvr }}%</div>
            </div>
            <div class="ci-data">
              <div class="ci-amt">¥{{ c.amt }}</div>
              <div class="ci-orders">{{ c.orders }} 单</div>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="cc-title">📊 优惠券发放统计</div>
        <div class="coupon-stat">
          <div class="cs-row"><span>已发放</span><span class="hl">328 张</span></div>
          <div class="cs-row"><span>已使用</span><span class="hl">86 张</span></div>
          <div class="cs-row"><span>使用率</span><span class="hl">26.2%</span></div>
          <div class="cs-row"><span>优惠金额</span><span class="hl">¥1,860</span></div>
        </div>
        <button class="act-btn">+ 创建优惠券</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const tools = [
  { name: '拼团活动', desc: '2-3 人成团享团购价', status: '进行中 3', icon: '👯', bg: '#FBF1EF' },
  { name: '接龙活动', desc: '群内限时成单', status: '进行中 3', icon: '🐉', bg: '#E8F0E8' },
  { name: '优惠券', desc: '满减 / 折扣券', status: '5 个', icon: '🎟️', bg: '#F0E6D5' },
  { name: '满减活动', desc: '满 X 减 Y', status: '2 个', icon: '💰', bg: '#F0E0E0' },
  { name: '限时折扣', desc: '秒杀 / 限时特价', status: '未开始', icon: '⚡', bg: '#F0E0F0' },
  { name: '积分商城', desc: '积分兑换好物', status: '运行中', icon: '🎁', bg: '#E0E0F0' },
  { name: '分销中心', desc: '用户分销返佣', status: '23 人', icon: '👥', bg: '#E0F0F0' },
  { name: '会员体系', desc: '银卡 / 金卡 / 钻石', status: '运行中', icon: '👑', bg: '#F0E6D5' }
]

const campaigns = [
  { name: '春日宋锦发卡专场接龙', time: '09-08', amt: '420', orders: 12, cvr: 18.5 },
  { name: '朱砂发卡 2 人团', time: '09-07', amt: '870', orders: 30, cvr: 25.6 },
  { name: '新会员 9 折优惠', time: '09-01~09-30', amt: '1560', orders: 18, cvr: 12.3 },
  { name: '满 200 减 25', time: '09-05~09-15', amt: '1280', orders: 22, cvr: 15.8 }
]
</script>

<style lang="scss" scoped>
.admin-page { display: flex; flex-direction: column; gap: 16px; }

.marketing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.mc-card { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 8px; padding: 16px; transition: box-shadow 0.2s; &:hover { box-shadow: var(--shadow-md); cursor: pointer; } }
.mc-icon { width: 48px; height: 48px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.mc-info { flex: 1; }
.mc-name { font-size: 14px; font-weight: 600; }
.mc-desc { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }
.mc-status { font-size: 11px; color: var(--color-primary); }

.charts-row { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12px; }
.chart-card { background: #fff; border-radius: 8px; padding: 16px; }
.cc-title { font-size: 14px; font-weight: 600; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #E5DFD3; }

.campaign-list { display: flex; flex-direction: column; gap: 8px; }
.camp-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: var(--color-bg); border-radius: 6px; }
.ci-name { font-size: 13px; font-weight: 500; }
.ci-sub { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
.ci-data { text-align: right; }
.ci-amt { color: var(--color-primary); font-size: 14px; font-weight: 700; }
.ci-orders { font-size: 10px; color: var(--color-ink-3); }

.coupon-stat { margin-bottom: 16px; }
.cs-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; .hl { color: var(--color-primary); font-weight: 600; } }

.act-btn { width: 100%; padding: 10px; background: var(--color-primary); color: #fff; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; &:hover { background: var(--color-primary-light); } }
</style>
