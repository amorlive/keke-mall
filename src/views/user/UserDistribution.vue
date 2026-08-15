<template>
  <div class="page user-dist">
    <van-nav-bar title="分销中心" left-arrow @click-left="$router.back()" :border="false" />

    <div class="dist-hero">
      <div class="dh-bg"></div>
      <div class="dh-row">
        <div class="dh-stat">
          <div class="dh-num">¥286</div>
          <div class="dh-label">累计佣金</div>
        </div>
        <div class="dh-stat">
          <div class="dh-num">¥86</div>
          <div class="dh-label">可提现</div>
        </div>
        <div class="dh-stat">
          <div class="dh-num">12</div>
          <div class="dh-label">邀请人数</div>
        </div>
      </div>
      <div class="dh-btn">立即提现</div>
    </div>

    <div class="action-grid">
      <div class="ag-item" @click="$router.push('/user/distribution/poster')">
        <div class="ag-icon">🖼️</div>
        <div class="ag-name">专属海报</div>
      </div>
      <div class="ag-item" @click="$router.push('/user/distribution/team')">
        <div class="ag-icon">👥</div>
        <div class="ag-name">我的团队</div>
      </div>
      <div class="ag-item" @click="$router.push('/user/distribution/commission')">
        <div class="ag-icon">💰</div>
        <div class="ag-name">佣金明细</div>
      </div>
      <div class="ag-item">
        <div class="ag-icon">📋</div>
        <div class="ag-name">提现记录</div>
      </div>
    </div>

    <div class="rule-card">
      <div class="rc-title">— 分销规则 —</div>
      <div class="rc-item">1. 分享专属海报/链接给好友</div>
      <div class="rc-item">2. 好友通过你的链接下单，你获得订单 10% 佣金</div>
      <div class="rc-item">3. 佣金满 ¥50 可提现，3 个工作日到账</div>
      <div class="rc-item">4. 好友成为分销员后，享受二级分销奖励</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-dist { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }

.dist-hero { position: relative; padding: 24px 16px; color: #F5EFE6; margin: 12px; border-radius: var(--radius-lg); overflow: hidden; }
.dh-bg { position: absolute; inset: 0; background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); z-index: -1; }
.dh-row { display: flex; }
.dh-stat { flex: 1; text-align: center; }
.dh-num { font-size: 22px; font-weight: 700; font-family: var(--font-serif); }
.dh-label { font-size: 11px; opacity: 0.85; margin-top: 4px; }
.dh-btn { margin-top: 16px; background: var(--color-gold); color: var(--color-primary-dark); text-align: center; padding: 10px; border-radius: 22px; font-size: 14px; font-weight: 600; letter-spacing: 0.1em; }

.action-grid { display: flex; justify-content: space-around; background: var(--color-bg-2); margin: 0 12px 12px; padding: 16px; border-radius: var(--radius-md); }
.ag-item { text-align: center; }
.ag-icon { font-size: 28px; }
.ag-name { font-size: 11px; color: var(--color-ink-2); margin-top: 4px; }

.rule-card { margin: 0 12px; padding: 14px; background: var(--color-bg-2); border-radius: var(--radius-md); }
.rc-title { text-align: center; font-family: var(--font-serif); color: var(--color-ink-3); font-size: 12px; letter-spacing: 0.3em; margin-bottom: 10px; }
.rc-item { font-size: 11px; color: var(--color-ink-2); padding: 3px 0; }
</style>
