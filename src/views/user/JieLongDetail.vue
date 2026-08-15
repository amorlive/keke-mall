<template>
  <div class="page jl-detail" v-if="jl">
    <van-nav-bar
      title="接龙详情"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <!-- 顶部状态 -->
    <div class="status-card">
      <div class="status-top">
        <div class="status-text">
          <div class="status-title">🐉 接龙进行中</div>
          <div class="status-sub">还差 <span class="hl">{{ jl.targetCount - jl.currentCount }}</span> 件截单</div>
        </div>
        <div class="status-time">
          <div class="st-label">距结束</div>
          <div class="st-val">{{ timeLeft(jl.deadline) }}</div>
        </div>
      </div>
      <div class="progress">
        <div class="p-bar">
          <div class="p-fill" :style="{ width: (jl.currentCount / jl.targetCount * 100) + '%' }"></div>
        </div>
        <div class="p-text">
          <span class="p-num">{{ jl.currentCount }}</span>
          <span class="p-total">/ {{ jl.targetCount }} 件</span>
        </div>
      </div>
    </div>

    <!-- 发起人 -->
    <div class="initiator-card">
      <div class="ic-avatar">{{ jl.initiator.avatar }}</div>
      <div class="ic-info">
        <div class="ic-name">{{ jl.initiator.nickname }}</div>
        <div class="ic-tag">🌟 群主 · 可可手作</div>
      </div>
      <div class="ic-btn" @click="$router.push('/jielong/create')">+ 我也要发起</div>
    </div>

    <!-- 商品 -->
    <div class="goods-card">
      <img :src="goods?.cover" class="g-cover" />
      <div class="g-info">
        <div class="g-name">{{ goods?.name }}</div>
        <div class="g-brief">{{ goods?.brief }}</div>
        <div class="g-price-row">
          <div class="g-price">¥{{ jl.price }} <span class="g-old">¥{{ goods?.originalPrice }}</span></div>
          <div class="g-tag">接龙价</div>
        </div>
      </div>
    </div>

    <!-- 跟单列表 -->
    <div class="orders-card">
      <div class="o-title">— 已 {{ jl.participants.length }} 人跟单 —</div>
      <div class="o-list">
        <div v-for="(p, i) in jl.participants" :key="i" class="o-item">
          <div class="o-avatar">{{ p.nickname[0] }}</div>
          <div class="o-info">
            <div class="o-name">{{ p.nickname }}</div>
            <div class="o-time">{{ p.time }} · 跟单 ×{{ p.count }}</div>
          </div>
          <div class="o-amount">¥{{ jl.price * p.count }}</div>
        </div>
      </div>
    </div>

    <!-- 群内消息 -->
    <div class="chat-card">
      <div class="c-title">📢 群内通知</div>
      <div class="c-bubble">【可可手作】本期接龙即将截单，已跟单 <span class="hl">{{ jl.currentCount }}</span> 件，还差 <span class="hl">{{ jl.targetCount - jl.currentCount }}</span> 件开团成功～</div>
      <div class="c-bubble">数量有限，需要的姐妹赶紧下单啦 🌸</div>
    </div>

    <!-- 底部 -->
    <div class="bottom-bar">
      <div class="bb-side">
        <div class="bb-icon" @click="$router.push('/jielong/list')">
          <van-icon name="list-switching" size="20" />
          <span>接龙列表</span>
        </div>
        <div class="bb-icon" @click="showShare = true">
          <van-icon name="share-o" size="20" />
          <span>分享</span>
        </div>
      </div>
      <div class="bb-btn" @click="onJoin">立即跟单 ¥{{ jl.price }}</div>
    </div>

    <!-- 规格选择弹层 -->
    <van-popup v-model:show="showSku" position="bottom" round :style="{ height: 'auto' }">
      <div class="sku-popup">
        <div class="sp-head">
          <img :src="goods?.cover" class="sp-img" />
          <div class="sp-price-info">
            <div class="sp-price">¥{{ jl.price }}</div>
            <div class="sp-stock">库存 {{ goods?.stock }}</div>
          </div>
        </div>
        <div class="sp-section" v-for="(s, si) in goods?.specs" :key="si">
          <div class="sp-label">{{ s.name }}</div>
          <div class="sp-opts">
            <span v-for="v in s.values" :key="v" class="sp-opt">{{ v }}</span>
          </div>
        </div>
        <div class="sp-section">
          <div class="sp-label">跟单数量</div>
          <van-stepper v-model="qty" min="1" :max="goods?.stock" />
        </div>
        <div style="padding: 12px;">
          <van-button type="danger" block @click="confirm">确认跟单 ¥{{ (jl.price * qty).toFixed(2) }}</van-button>
        </div>
      </div>
    </van-popup>

    <van-share-sheet
      v-model:show="showShare"
      title="分享到群聊"
      :options="shareOptions"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { jieLongList, findGoods } from '@/data/mock'
import { timeLeft } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const showSku = ref(false)
const showShare = ref(false)
const qty = ref(1)

const jl = computed(() => jieLongList.find(j => j.id === route.params.id))
const goods = computed(() => jl.value ? findGoods(jl.value.goodsId) : null)

const shareOptions = [
  { name: '微信群', icon: 'wechat' },
  { name: '微信好友', icon: 'wechat' },
  { name: '复制链接', icon: 'link-o' },
  { name: '保存到相册', icon: 'photograph' }
]

function onJoin() { showSku.value = true }

function confirm() {
  showSku.value = false
  showToast('跟单成功！')
  setTimeout(() => router.push({ path: '/checkout', query: { from: 'jielong', jlId: jl.value.id, qty: qty.value } }), 600)
}
</script>

<style lang="scss" scoped>
.jl-detail {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 80px;
}

:deep(.van-nav-bar) {
  background: var(--color-primary);
  .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; }
  .van-hairline--bottom::after { border: none; }
}

.status-card {
  background: linear-gradient(135deg, #6B8E6B, #4A6B4A);
  color: #F5EFE6;
  margin: 12px;
  padding: 16px;
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  &::after {
    content: '🐉';
    position: absolute;
    right: -10px; bottom: -20px;
    font-size: 100px;
    opacity: 0.12;
  }
}

.status-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.status-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.status-sub {
  font-size: 12px;
  margin-top: 4px;
  .hl { color: var(--color-gold-light); font-weight: 700; font-size: 16px; }
}

.status-time {
  text-align: right;
  .st-label { font-size: 10px; opacity: 0.85; }
  .st-val { font-family: monospace; font-size: 18px; font-weight: 600; color: var(--color-gold-light); margin-top: 2px; }
}

.progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
  position: relative;
  z-index: 1;
}

.p-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.p-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold), #F0D78C);
  border-radius: 4px;
}

.p-num { color: var(--color-gold-light); font-size: 18px; font-weight: 700; }
.p-total { font-size: 12px; opacity: 0.85; }

.initiator-card {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 12px 12px;
  padding: 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.ic-avatar {
  width: 44px; height: 44px;
  background: var(--color-primary-50);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.ic-info { flex: 1; }
.ic-name { font-size: 14px; font-weight: 500; }
.ic-tag { font-size: 10px; color: var(--color-primary); margin-top: 2px; }

.ic-btn {
  font-size: 11px;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  padding: 4px 10px;
  border-radius: 12px;
}

.goods-card {
  display: flex;
  gap: 12px;
  margin: 0 12px 12px;
  padding: 10px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.g-cover { width: 90px; height: 90px; border-radius: 6px; object-fit: cover; }
.g-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.g-name { font-size: 14px; font-weight: 500; line-height: 1.3; }
.g-brief { font-size: 11px; color: var(--color-ink-3); line-height: 1.3; }
.g-price-row { display: flex; justify-content: space-between; align-items: center; }
.g-price { color: var(--color-primary); font-size: 18px; font-weight: 700; }
.g-old { color: var(--color-ink-3); text-decoration: line-through; font-size: 11px; font-weight: 400; }
.g-tag {
  font-size: 10px;
  background: var(--color-primary);
  color: #F5EFE6;
  padding: 1px 6px;
  border-radius: 3px;
}

.orders-card {
  margin: 0 12px 12px;
  padding: 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.o-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--color-ink-3);
  letter-spacing: 0.2em;
  margin-bottom: 12px;
}

.o-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--color-bg-3);
  &:last-child { border-bottom: none; }
}

.o-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px;
}

.o-info { flex: 1; }
.o-name { font-size: 13px; }
.o-time { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
.o-amount { color: var(--color-primary); font-size: 13px; font-weight: 600; }

.chat-card {
  margin: 0 12px;
  padding: 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.c-title { font-size: 13px; font-weight: 600; margin-bottom: 10px; }

.c-bubble {
  background: var(--color-bg);
  border-radius: 8px;
  padding: 8px 10px;
  font-size: 12px;
  color: var(--color-ink-2);
  margin-bottom: 6px;
  line-height: 1.6;
  .hl { color: var(--color-primary); font-weight: 600; }
}

.bottom-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  display: flex;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-bg-3);
  z-index: 10;
}

.bb-side { display: flex; }
.bb-icon {
  width: 56px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-size: 10px;
  color: var(--color-ink-2);
  padding: 6px 0;
  .van-icon { margin-bottom: 2px; }
}

.bb-btn {
  flex: 1;
  background: linear-gradient(135deg, #6B8E6B, #4A6B4A);
  color: #F5EFE6;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.sku-popup {
  background: var(--color-bg-2);
  padding: 16px;
  border-radius: 16px 16px 0 0;
}

.sp-head { display: flex; gap: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--color-bg-3); }
.sp-img { width: 80px; height: 80px; border-radius: 6px; object-fit: cover; }
.sp-price-info { padding-top: 20px; }
.sp-price { color: var(--color-primary); font-size: 20px; font-weight: 700; }
.sp-stock { font-size: 11px; color: var(--color-ink-3); margin-top: 4px; }

.sp-section { padding: 12px 0; border-bottom: 1px solid var(--color-bg-3); }
.sp-label { font-size: 12px; color: var(--color-ink-2); margin-bottom: 8px; }
.sp-opts { display: flex; gap: 8px; flex-wrap: wrap; }
.sp-opt { padding: 4px 12px; background: var(--color-bg); border: 1px solid var(--color-bg-3); border-radius: 14px; font-size: 12px; color: var(--color-ink-2); }
</style>
