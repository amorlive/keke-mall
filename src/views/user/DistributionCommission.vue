<template>
  <div class="page dist-comm">
    <van-nav-bar title="佣金明细" left-arrow @click-left="$router.back()" :border="false" />
    <div class="comm-card">
      <div class="cc-row">
        <div class="cc-stat">
          <div class="cc-num">¥286</div>
          <div class="cc-label">累计佣金</div>
        </div>
        <div class="cc-stat">
          <div class="cc-num">¥86</div>
          <div class="cc-label">已提现</div>
        </div>
        <div class="cc-stat">
          <div class="cc-num">¥200</div>
          <div class="cc-label">待结算</div>
        </div>
      </div>
    </div>
    <div class="list-title">— 佣金记录 —</div>
    <div class="list">
      <div v-for="(c, i) in records" :key="i" class="rec">
        <div class="r-info">
          <div class="r-name">订单 {{ c.orderId }} 返佣</div>
          <div class="r-time">{{ c.time }} · {{ c.status }}</div>
        </div>
        <div class="r-amt">+¥{{ c.amt }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const records = [
  { orderId: 'o20260908', time: '2026-09-08', status: '已结算', amt: '3.90' },
  { orderId: 'o20260907', time: '2026-09-07', status: '已结算', amt: '8.80' },
  { orderId: 'o20260905', time: '2026-09-05', status: '待结算', amt: '13.60' },
  { orderId: 'o20260901', time: '2026-09-01', status: '已结算', amt: '5.60' }
]
</script>

<style lang="scss" scoped>
.dist-comm { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }

.comm-card { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #F5EFE6; margin: 12px; padding: 24px 16px; border-radius: var(--radius-lg); }
.cc-row { display: flex; }
.cc-stat { flex: 1; text-align: center; border-right: 1px solid rgba(245, 239, 230, 0.2); &:last-child { border: none; } }
.cc-num { font-size: 22px; font-weight: 700; font-family: var(--font-serif); }
.cc-label { font-size: 11px; opacity: 0.85; margin-top: 2px; }

.list-title { text-align: center; font-family: var(--font-serif); color: var(--color-ink-3); font-size: 12px; letter-spacing: 0.3em; margin: 16px 0 8px; }
.list { padding: 0 12px; }
.rec { display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-2); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px; }
.r-name { font-size: 13px; font-weight: 500; }
.r-time { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
.r-amt { color: var(--color-primary); font-size: 15px; font-weight: 600; }
</style>
