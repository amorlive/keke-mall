<template>
  <div class="page user-points">
    <van-nav-bar title="积分中心" left-arrow @click-left="$router.back()" :border="false" />
    <div class="points-card">
      <div class="pc-label">当前积分</div>
      <div class="pc-num">286</div>
      <div class="pc-actions">
        <div class="pca-btn">兑换好物</div>
        <div class="pca-btn">积分明细</div>
      </div>
    </div>
    <div class="list">
      <div class="list-title">— 积分记录 —</div>
      <div v-for="(r, i) in records" :key="i" class="record">
        <div class="r-info">
          <div class="r-name">{{ r.name }}</div>
          <div class="r-time">{{ r.time }}</div>
        </div>
        <div class="r-amt" :class="r.type">+{{ r.points }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const records = [
  { name: '完成订单', time: '2026-09-08 10:23', points: 39, type: 'plus' },
  { name: '下单抵扣', time: '2026-09-08 10:23', points: -2, type: 'minus' },
  { name: '每日签到', time: '2026-09-07 09:00', points: 5, type: 'plus' },
  { name: '邀请好友', time: '2026-09-05 16:20', points: 50, type: 'plus' },
  { name: '完成订单', time: '2026-09-05 09:18', points: 136, type: 'plus' }
]
</script>

<style lang="scss" scoped>
.user-points { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }

.points-card { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #F5EFE6; margin: 12px; padding: 24px 16px; border-radius: var(--radius-lg); text-align: center; }
.pc-label { font-size: 11px; opacity: 0.85; letter-spacing: 0.2em; }
.pc-num { font-size: 48px; font-weight: 700; font-family: var(--font-serif); margin: 8px 0; }
.pc-actions { display: flex; gap: 12px; justify-content: center; margin-top: 8px; }
.pca-btn { padding: 6px 16px; border: 1px solid rgba(245, 239, 230, 0.4); border-radius: 16px; font-size: 12px; }

.list { padding: 12px; }
.list-title { text-align: center; font-family: var(--font-serif); color: var(--color-ink-3); font-size: 12px; letter-spacing: 0.3em; margin-bottom: 10px; }
.record { display: flex; justify-content: space-between; background: var(--color-bg-2); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px; }
.r-name { font-size: 13px; }
.r-time { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }
.r-amt { font-size: 16px; font-weight: 600; &.plus { color: var(--color-primary); } &.minus { color: var(--color-ink-3); } }
</style>
