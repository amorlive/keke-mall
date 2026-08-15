<template>
  <div class="page checkout">
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <!-- 收货地址 -->
    <div class="address-card" @click="$router.push('/user/address')">
      <div class="addr-icon">📍</div>
      <div class="addr-info">
        <div class="addr-line1">
          <span class="addr-name">可可</span>
          <span class="addr-phone">138****8888</span>
          <span class="default-tag">默认</span>
        </div>
        <div class="addr-detail">江苏省 苏州市 姑苏区 平江路 88 号 2 楼</div>
      </div>
      <div class="addr-arrow">›</div>
    </div>

    <!-- 商品清单 -->
    <div class="goods-card">
      <div class="gc-title">— 商品清单 —</div>
      <div class="gc-list">
        <div v-for="(g, i) in goodsItems" :key="i" class="gc-item">
          <img :src="g.cover" class="gc-img" />
          <div class="gc-info">
            <div class="gc-name">{{ g.name }}</div>
            <div class="gc-spec">{{ g.spec }}</div>
          </div>
          <div class="gc-right">
            <div class="gc-price">¥{{ g.price }}</div>
            <div class="gc-qty">×{{ g.qty }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 配送方式 -->
    <div class="opt-card">
      <div class="opt-row" @click="showDelivery = true">
        <span>配送方式</span>
        <span class="opt-val">{{ delivery === 'express' ? '快递发货 · 包邮' : '到店自提 · 苏州平江路店' }} <span class="arrow">›</span></span>
      </div>
      <div class="opt-row">
        <span>优惠券</span>
        <span class="opt-val">3 张可用 <span class="arrow">›</span></span>
      </div>
      <div class="opt-row">
        <span>使用积分</span>
        <span class="opt-val">
          <span class="opt-hl">可用 286 分（抵 ¥2.86）</span>
          <span class="arrow">›</span>
        </span>
      </div>
      <div class="opt-row">
        <span>买家留言</span>
        <input v-model="remark" placeholder="选填，建议留言前先与商家沟通" class="remark" maxlength="50" />
      </div>
    </div>

    <!-- 价格明细 -->
    <div class="price-card">
      <div class="pc-row"><span>商品金额</span><span>¥{{ subtotal.toFixed(2) }}</span></div>
      <div class="pc-row"><span>运费</span><span>¥0.00</span></div>
      <div class="pc-row"><span>优惠</span><span class="hl">-¥10.00</span></div>
      <div class="pc-row"><span>积分抵扣</span><span class="hl">-¥2.86</span></div>
      <div class="pc-row total"><span>实付</span><span class="total-price">¥{{ total.toFixed(2) }}</span></div>
    </div>

    <van-submit-bar
      :price="total * 100"
      button-text="提交订单"
      :button-color="'var(--color-primary)'"
      @submit="onSubmit"
    >
      <template #default>
        <div class="bar-info">
          <div class="bar-total">合计：<span class="hl">¥{{ total.toFixed(2) }}</span></div>
          <div class="bar-detail">已优惠 ¥12.86</div>
        </div>
      </template>
    </van-submit-bar>

    <!-- 配送方式选择 -->
    <van-popup v-model:show="showDelivery" position="bottom" round :style="{ height: 'auto' }">
      <div class="delivery-popup">
        <div class="dp-title">选择配送方式</div>
        <div
          :class="['dp-item', { active: delivery === 'express' }]"
          @click="selectDelivery('express')"
        >
          <div class="dpi-icon">📦</div>
          <div class="dpi-info">
            <div class="dpi-name">快递发货</div>
            <div class="dpi-sub">顺丰包邮 · 预计 3-5 天到达</div>
          </div>
          <van-icon name="success" v-if="delivery === 'express'" class="dpi-check" />
        </div>
        <div
          :class="['dp-item', { active: delivery === 'self' }]"
          @click="selectDelivery('self')"
        >
          <div class="dpi-icon">🏪</div>
          <div class="dpi-info">
            <div class="dpi-name">到店自提</div>
            <div class="dpi-sub">可可手作 · 苏州平江路 88 号</div>
          </div>
          <van-icon name="success" v-if="delivery === 'self'" class="dpi-check" />
        </div>
        <div style="height: 16px;"></div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { findGoods } from '@/data/mock'

const router = useRouter()
const showDelivery = ref(false)
const delivery = ref('express')
const remark = ref('')

const goodsItems = ref([
  { goodsId: 1, name: '锦绣 · 朱砂发卡', spec: '朱砂红 / 中号 8cm', cover: findGoods(1).cover, price: 39, qty: 1 },
  { goodsId: 3, name: '缠枝 · 宋锦手链', spec: '朱砂 / 16cm', cover: findGoods(3).cover, price: 88, qty: 1 }
])

const subtotal = computed(() => goodsItems.value.reduce((s, g) => s + g.price * g.qty, 0))
const total = computed(() => Math.max(0, subtotal.value - 10 - 2.86))

function selectDelivery(t) {
  delivery.value = t
  showDelivery.value = false
}

function onSubmit() {
  showLoadingToast({ message: '提交中...', forbidClick: true })
  setTimeout(() => {
    closeToast()
    showToast('订单已提交')
    setTimeout(() => router.replace('/pay/success'), 600)
  }, 1200)
}
</script>

<style lang="scss" scoped>
.checkout {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 80px;
}

:deep(.van-nav-bar) {
  background: var(--color-primary);
  .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; }
  .van-hairline--bottom::after { border: none; }
}

.address-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px;
  padding: 14px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-gold);
}

.addr-icon { font-size: 22px; }
.addr-info { flex: 1; }
.addr-line1 { display: flex; align-items: center; gap: 8px; }
.addr-name { font-size: 15px; font-weight: 600; }
.addr-phone { font-size: 13px; color: var(--color-ink-2); }
.default-tag {
  font-size: 10px;
  padding: 1px 5px;
  background: var(--color-primary);
  color: #F5EFE6;
  border-radius: 3px;
}
.addr-detail { font-size: 12px; color: var(--color-ink-2); margin-top: 4px; }
.addr-arrow { font-size: 20px; color: var(--color-ink-3); }

.goods-card, .opt-card, .price-card {
  margin: 0 12px 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
  padding: 12px;
}

.gc-title {
  font-family: var(--font-serif);
  text-align: center;
  color: var(--color-ink-3);
  font-size: 12px;
  letter-spacing: 0.3em;
  margin-bottom: 10px;
}

.gc-item {
  display: flex;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed var(--color-bg-3);
  &:last-child { border-bottom: none; }
}

.gc-img { width: 64px; height: 64px; border-radius: 6px; object-fit: cover; }
.gc-info { flex: 1; min-width: 0; }
.gc-name { font-size: 13px; line-height: 1.3; }
.gc-spec { font-size: 11px; color: var(--color-ink-3); margin-top: 4px; }
.gc-right { text-align: right; }
.gc-price { font-size: 14px; font-weight: 600; color: var(--color-ink); }
.gc-qty { font-size: 11px; color: var(--color-ink-3); margin-top: 4px; }

.opt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-bg-3);
  font-size: 13px;
  &:last-child { border-bottom: none; }
  span:first-child { color: var(--color-ink-2); }
  .opt-val { color: var(--color-ink); display: flex; align-items: center; }
  .opt-hl { color: var(--color-primary); }
  .arrow { color: var(--color-ink-3); margin-left: 2px; }
}

.remark {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  text-align: right;
  font-size: 12px;
  color: var(--color-ink);
  &::placeholder { color: var(--color-ink-3); }
}

.price-card .pc-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  color: var(--color-ink-2);
  .hl { color: var(--color-primary); }
}

.pc-row.total {
  border-top: 1px dashed var(--color-ink-4);
  margin-top: 6px;
  padding-top: 12px;
  font-size: 14px;
  color: var(--color-ink);
  font-weight: 600;
}

.total-price { color: var(--color-primary); font-size: 18px; }

.bar-info { display: flex; flex-direction: column; }
.bar-total { font-size: 14px; font-weight: 600; }
.bar-total .hl { color: var(--color-primary); font-size: 18px; }
.bar-detail { font-size: 10px; color: var(--color-ink-3); }

:deep(.van-submit-bar) { bottom: 0; }

.delivery-popup {
  padding: 20px 16px 0;
  background: var(--color-bg-2);
  border-radius: 16px 16px 0 0;
}

.dp-title {
  font-family: var(--font-serif);
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
}

.dp-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  margin-bottom: 8px;
  &.active {
    background: var(--color-primary-50);
    border: 1px solid var(--color-primary);
  }
}

.dpi-icon { font-size: 24px; }
.dpi-info { flex: 1; }
.dpi-name { font-size: 14px; font-weight: 500; }
.dpi-sub { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }
.dpi-check { color: var(--color-primary); font-size: 20px; }
</style>
