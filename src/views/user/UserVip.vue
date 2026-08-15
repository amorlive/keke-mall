<template>
  <div class="page user-vip">
    <van-nav-bar title="会员中心" left-arrow @click-left="$router.back()" :border="false" />
    <div class="vip-hero">
      <div class="vh-bg"></div>
      <div class="vh-crown">👑</div>
      <div class="vh-title">可可手作 · 会员中心</div>
      <div class="vh-level">当前：银卡会员</div>
      <div class="vh-progress">
        <div class="vp-text">距离金卡还差 <span class="hl">¥214</span></div>
        <div class="vp-bar"><div class="vp-fill" style="width: 36%;"></div></div>
      </div>
    </div>
    <div class="levels">
      <div class="lv-card active">
        <div class="lv-name">银卡</div>
        <div class="lv-benefit">9.5 折</div>
      </div>
      <div class="lv-card next">
        <div class="lv-name">金卡</div>
        <div class="lv-benefit">9 折 · 包邮</div>
      </div>
      <div class="lv-card">
        <div class="lv-name">钻石</div>
        <div class="lv-benefit">8.5 折 · 生日礼</div>
      </div>
    </div>
    <div class="privileges">
      <div class="pr-title">— 会员特权 —</div>
      <div class="pr-grid">
        <div class="pr-item" v-for="p in privileges" :key="p.name">
          <div class="pr-icon">{{ p.icon }}</div>
          <div class="pr-name">{{ p.name }}</div>
          <div class="pr-desc">{{ p.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const privileges = [
  { icon: '💰', name: '会员折扣', desc: '全场 9-9.5 折' },
  { icon: '📦', name: '包邮特权', desc: '金卡起顺丰包邮' },
  { icon: '🎂', name: '生日礼', desc: '生日专享礼盒' },
  { icon: '⚡', name: '优先发货', desc: '专属绿色通道' },
  { icon: '🎟️', name: '专属券', desc: '每月 3 张专享' },
  { icon: '💎', name: '积分倍率', desc: '消费 1 元 = 2 积分' }
]
</script>

<style lang="scss" scoped>
.user-vip { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }

.vip-hero { position: relative; padding: 30px 16px 20px; color: #2B2118; text-align: center; }
.vh-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #C9A961, #A88845); z-index: -1; }
.vh-crown { font-size: 36px; }
.vh-title { font-family: var(--font-serif); font-size: 18px; letter-spacing: 0.2em; margin-top: 6px; }
.vh-level { font-size: 12px; opacity: 0.8; margin-top: 4px; }
.vh-progress { margin-top: 16px; }
.vp-text { font-size: 12px; .hl { color: #FFE4A0; font-weight: 700; } }
.vp-bar { height: 6px; background: rgba(43, 33, 24, 0.2); border-radius: 3px; margin-top: 6px; overflow: hidden; }
.vp-fill { height: 100%; background: #2B2118; border-radius: 3px; }

.levels { display: flex; gap: 8px; margin: 12px; }
.lv-card { flex: 1; text-align: center; padding: 12px; background: var(--color-bg-2); border-radius: var(--radius-md); opacity: 0.5; &.active { background: linear-gradient(135deg, #C9A961, #A88845); color: #2B2118; opacity: 1; } &.next { border: 1px dashed #C9A961; opacity: 0.8; } }
.lv-name { font-size: 14px; font-weight: 600; }
.lv-benefit { font-size: 11px; opacity: 0.85; margin-top: 4px; }

.privileges { padding: 12px; }
.pr-title { text-align: center; font-family: var(--font-serif); color: var(--color-ink-3); font-size: 12px; letter-spacing: 0.3em; margin-bottom: 12px; }
.pr-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.pr-item { background: var(--color-bg-2); border-radius: var(--radius-md); padding: 12px 8px; text-align: center; }
.pr-icon { font-size: 28px; }
.pr-name { font-size: 12px; font-weight: 500; margin-top: 4px; }
.pr-desc { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
</style>
