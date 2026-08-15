<template>
  <div class="page dist-poster">
    <van-nav-bar title="专属海报" left-arrow @click-left="$router.back()" :border="false" />
    <div class="poster-wrap">
      <div class="poster">
        <div class="p-head">
          <div class="p-logo">可</div>
          <div class="p-brand">可可手作 · 邀请你加入</div>
        </div>
        <div class="p-content">
          <div class="p-title">🌸 一寸宋锦 一寸心意</div>
          <div class="p-goods">
            <div class="pg-item" v-for="i in 3" :key="i">
              <img :src="goodsList[i - 1].cover" />
              <div class="pg-name">{{ goodsList[i - 1].name }}</div>
              <div class="pg-price">¥{{ goodsList[i - 1].price }}</div>
            </div>
          </div>
        </div>
        <div class="p-code">
          <div class="pc-qr">📱</div>
          <div class="pc-info">
            <div class="pc-t1">长按 / 扫码识别</div>
            <div class="pc-t2">立即下单享专属优惠</div>
          </div>
        </div>
        <div class="p-foot">
          <div class="pf-name">可可不加班 邀请</div>
          <div class="pf-code">邀请码：KEKE2026</div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="act-btn" @click="onSave">保存到相册</div>
      <div class="act-btn primary" @click="onShare">分享好友</div>
    </div>
  </div>
</template>

<script setup>
import { showToast } from 'vant'
import { goodsList } from '@/data/mock'

function onSave() { showToast('已保存到相册（演示）') }
function onShare() { showToast('分享成功（演示）') }
</script>

<style lang="scss" scoped>
.dist-poster { min-height: 100vh; background: var(--color-bg-3); padding-bottom: 100px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }

.poster-wrap { padding: 16px; }
.poster { background: var(--color-bg-2); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-md); }
.p-head { display: flex; align-items: center; gap: 10px; background: var(--color-primary); color: #F5EFE6; padding: 16px; }
.p-logo { width: 36px; height: 36px; background: var(--color-gold); color: var(--color-primary-dark); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 20px; font-weight: 700; }
.p-brand { font-family: var(--font-serif); font-size: 15px; letter-spacing: 0.1em; }
.p-content { padding: 16px; }
.p-title { font-family: var(--font-serif); font-size: 18px; text-align: center; letter-spacing: 0.1em; color: var(--color-ink); margin-bottom: 16px; }
.p-goods { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
.pg-item { text-align: center; img { width: 100%; aspect-ratio: 1; border-radius: 6px; object-fit: cover; } }
.pg-name { font-size: 10px; line-height: 1.3; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.pg-price { color: var(--color-primary); font-size: 12px; font-weight: 600; margin-top: 2px; }

.p-code { display: flex; align-items: center; gap: 12px; padding: 0 16px 16px; }
.pc-qr { width: 80px; height: 80px; background: #fff; border: 2px solid var(--color-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 36px; }
.pc-t1 { font-size: 13px; font-weight: 500; }
.pc-t2 { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }

.p-foot { display: flex; justify-content: space-between; align-items: center; background: var(--color-bg); padding: 12px 16px; font-size: 12px; color: var(--color-ink-2); }
.pf-name { color: var(--color-primary); font-weight: 500; }
.pf-code { font-family: monospace; }

.actions { display: flex; gap: 12px; padding: 0 16px; }
.act-btn { flex: 1; height: 44px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-primary); color: var(--color-primary); border-radius: 22px; font-size: 13px; letter-spacing: 0.1em; &.primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; border: none; } }
</style>
