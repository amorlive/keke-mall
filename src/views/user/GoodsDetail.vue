<template>
  <div class="page goods-detail" v-if="goods">
    <van-nav-bar
      title="商品详情"
      left-arrow
      @click-left="$router.back()"
      :border="false"
      class="nav-on-img"
    />

    <!-- 主图轮播 -->
    <van-swipe :autoplay="3000" class="main-swipe">
      <van-swipe-item v-for="(img, i) in goods.images" :key="i">
        <img :src="img" class="main-img" />
      </van-swipe-item>
    </van-swipe>

    <!-- 价格区 -->
    <div class="price-block">
      <div class="price-row">
        <div class="price-main">
          <span class="sym">¥</span>{{ goods.price }}
          <span v-if="goods.originalPrice > goods.price" class="old">¥{{ goods.originalPrice }}</span>
        </div>
        <div class="sales">已售 {{ goods.sales }}</div>
      </div>
      <div class="name-row">
        <h1 class="name">{{ goods.name }}</h1>
        <div class="tags">
          <span v-for="t in goods.tags" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
      <div class="brief">{{ goods.brief }}</div>
    </div>

    <!-- 营销活动 -->
    <div class="marketing" v-if="goods.isGroup || goods.isJieLong">
      <div class="m-title">🎁 活动</div>
      <div class="m-item" v-if="goods.isGroup">
        <span class="m-label">👯 拼团</span>
        <span class="m-text">2-3 人成团 立省 {{ Math.round((goods.originalPrice - goods.price) * 0.7) }} 元</span>
        <span class="m-go" @click="goGroup">去开团 ›</span>
      </div>
      <div class="m-item" v-if="goods.isJieLong">
        <span class="m-label">🐉 接龙</span>
        <span class="m-text">群内限时成单 更低价</span>
        <span class="m-go" @click="goJieLong">去看看 ›</span>
      </div>
    </div>

    <!-- 服务保障 -->
    <div class="services">
      <div class="s-item">✓ 7 天无理由</div>
      <div class="s-item">✓ 顺丰包邮</div>
      <div class="s-item">✓ 手工质保</div>
    </div>

    <!-- 规格选择 -->
    <div class="spec-row" @click="showSku = true">
      <span>已选</span>
      <span class="spec-text">{{ selectedSpec || '请选择 规格' }}</span>
      <span class="arrow">›</span>
    </div>

    <!-- 配送地址 -->
    <div class="spec-row">
      <span>配送</span>
      <span class="spec-text">江苏省 苏州市 至 <span class="hl">浙江·杭州</span></span>
      <span class="arrow">›</span>
    </div>

    <!-- 商品描述 -->
    <div class="desc-block">
      <div class="desc-title">— 商品详情 —</div>
      <div class="desc-content">
        <p class="desc-p">{{ goods.desc }}</p>
        <div class="desc-imgs">
          <img v-for="(img, i) in goods.images" :key="i" :src="img" class="desc-img" />
        </div>
        <div class="desc-specs">
          <div class="ds-title">📋 规格参数</div>
          <div class="ds-row" v-for="(s, i) in goods.specs" :key="i">
            <div class="ds-key">{{ s.name }}</div>
            <div class="ds-val">{{ s.values.join(' / ') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" @click="showToast('客服：微信 keke-handmade')" />
      <van-action-bar-icon icon="star-o" text="收藏" @click="showToast('已收藏')" />
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="cartCount || ''" @click="$router.push('/cart')" />
      <van-action-bar-button type="warning" text="加入购物车" @click="onAddCart" />
      <van-action-bar-button type="danger" text="立即购买" @click="onBuy" />
    </van-action-bar>

    <!-- SKU 弹层 -->
    <van-popup v-model:show="showSku" position="bottom" round :style="{ height: '70%' }">
      <div class="sku-popup">
        <div class="sku-head">
          <img :src="goods.cover" class="sku-img" />
          <div class="sku-price-info">
            <div class="sku-price">¥{{ goods.price }}</div>
            <div class="sku-stock">库存 {{ goods.stock }} 件</div>
          </div>
          <van-icon name="cross" class="sku-close" @click="showSku = false" />
        </div>

        <div class="sku-section" v-for="(s, si) in goods.specs" :key="si">
          <div class="sku-label">{{ s.name }}</div>
          <div class="sku-options">
            <span
              v-for="v in s.values"
              :key="v"
              :class="['sku-opt', { active: chosen[si] === v }]"
              @click="chosen[si] = v"
            >{{ v }}</span>
          </div>
        </div>

        <div class="sku-section">
          <div class="sku-label">数量</div>
          <van-stepper v-model="qty" min="1" :max="goods.stock" />
        </div>

        <div class="sku-bottom">
          <van-button type="warning" block @click="confirmAddCart">加入购物车</van-button>
          <van-button type="danger" block @click="confirmBuy">立即购买</van-button>
        </div>
      </div>
    </van-popup>
  </div>
  <div v-else class="empty-wrap">
    <van-empty description="商品不存在" />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { findGoods } from '@/data/mock'

const route = useRoute()
const router = useRouter()
const goods = computed(() => findGoods(route.params.id))

const showSku = ref(false)
const chosen = reactive({})
const qty = ref(1)
const cartCount = ref(2)

const selectedSpec = computed(() => {
  if (!goods.value) return ''
  return goods.value.specs.map((s, i) => chosen[i] || s.values[0]).join(' / ')
})

function goGroup() { router.push('/group/list') }
function goJieLong() { router.push('/jielong/list') }

function onAddCart() { showSku.value = true }
function onBuy() { showSku.value = true }

function confirmAddCart() {
  showToast('已加入购物车')
  cartCount.value++
  showSku.value = false
}

function confirmBuy() {
  showSku.value = false
  router.push({ path: '/checkout', query: { goodsId: goods.value.id, qty: qty.value, spec: selectedSpec.value } })
}
</script>

<style lang="scss" scoped>
.goods-detail {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 60px;
}

:deep(.nav-on-img) {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 10;
  background: transparent !important;
  .van-nav-bar__title, .van-icon { color: #F5EFE6 !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3); }
  .van-hairline--bottom::after { border: none; }
}

.main-swipe {
  background: var(--color-bg-3);
}

.main-img {
  width: 100%;
  height: 100vw;
  max-height: 480px;
  object-fit: cover;
  display: block;
}

.price-block {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #F5EFE6;
  padding: 16px;
  border-radius: 0 0 20px 20px;
  margin-bottom: 12px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.price-main {
  font-size: 32px;
  font-weight: 700;
  font-family: var(--font-serif);
  .sym { font-size: 0.5em; vertical-align: 8px; }
  .old { font-size: 14px; color: rgba(245, 239, 230, 0.6); text-decoration: line-through; margin-left: 8px; font-weight: 400; }
}

.sales {
  font-size: 11px;
  opacity: 0.8;
}

.name-row {
  margin-top: 12px;
}

.name {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 6px;
  line-height: 1.4;
}

.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tag {
  font-size: 10px;
  padding: 2px 6px;
  background: rgba(201, 169, 97, 0.25);
  color: var(--color-gold-light);
  border-radius: 4px;
}

.brief {
  font-size: 12px;
  opacity: 0.85;
  margin-top: 6px;
}

.marketing {
  margin: 0 12px 12px;
  background: linear-gradient(135deg, #FBF1EF, #FAF6EF);
  border: 1px dashed var(--color-primary);
  border-radius: var(--radius-md);
  padding: 10px 12px;
}

.m-title {
  font-size: 12px;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 6px;
}

.m-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 4px 0;
}

.m-label {
  color: var(--color-primary);
  font-weight: 600;
  margin-right: 8px;
}

.m-text {
  flex: 1;
  color: var(--color-ink-2);
}

.m-go {
  color: var(--color-primary);
  font-size: 11px;
}

.services {
  display: flex;
  justify-content: space-around;
  background: var(--color-bg-2);
  padding: 10px 16px;
  margin: 0 12px 12px;
  border-radius: var(--radius-md);
  font-size: 11px;
  color: var(--color-ink-2);
}

.spec-row {
  display: flex;
  align-items: center;
  background: var(--color-bg-2);
  margin: 0 12px 1px;
  padding: 12px 14px;
  font-size: 13px;
  color: var(--color-ink);
  &:first-of-type { border-radius: var(--radius-md) var(--radius-md) 0 0; }
  &:last-of-type { border-radius: 0 0 var(--radius-md) var(--radius-md); margin-bottom: 12px; }
  span:first-child { color: var(--color-ink-3); margin-right: 10px; min-width: 36px; }
  .spec-text { flex: 1; }
  .hl { color: var(--color-primary); }
  .arrow { color: var(--color-ink-4); }
}

.desc-block {
  background: var(--color-bg-2);
  margin: 0 12px 12px;
  border-radius: var(--radius-md);
  padding: 16px 12px;
}

.desc-title {
  text-align: center;
  font-family: var(--font-serif);
  color: var(--color-ink-2);
  font-size: 14px;
  letter-spacing: 0.3em;
  margin-bottom: 16px;
}

.desc-p {
  font-size: 13px;
  line-height: 1.8;
  color: var(--color-ink-2);
  margin: 0 0 12px;
}

.desc-imgs {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.desc-img {
  width: 100%;
  border-radius: 8px;
  display: block;
}

.desc-specs {
  margin-top: 20px;
  padding: 12px;
  background: var(--color-bg);
  border-radius: 8px;
}

.ds-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 10px;
  font-family: var(--font-serif);
  letter-spacing: 0.1em;
}

.ds-row {
  display: flex;
  font-size: 12px;
  padding: 5px 0;
  border-bottom: 1px dashed var(--color-ink-4);
  &:last-child { border-bottom: none; }
}

.ds-key {
  width: 80px;
  color: var(--color-ink-3);
}

.ds-val {
  flex: 1;
  color: var(--color-ink-2);
}

:deep(.van-action-bar) {
  border-top: 1px solid var(--color-ink-4);
}

:deep(.van-button--warning) {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-primary-dark);
}

.sku-popup {
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-2);
}

.sku-head {
  display: flex;
  gap: 12px;
  align-items: flex-end;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-bg-3);
  position: relative;
}

.sku-img {
  width: 88px; height: 88px;
  border-radius: 8px;
  border: 2px solid #fff;
  box-shadow: var(--shadow-sm);
  object-fit: cover;
}

.sku-price-info { flex: 1; padding-bottom: 4px; }
.sku-price { color: var(--color-primary); font-size: 22px; font-weight: 700; }
.sku-stock { color: var(--color-ink-3); font-size: 11px; margin-top: 4px; }
.sku-close { padding: 8px; color: var(--color-ink-3); }

.sku-section {
  padding: 16px 0;
  border-bottom: 1px solid var(--color-bg-3);
}

.sku-label {
  font-size: 12px;
  color: var(--color-ink-2);
  margin-bottom: 10px;
}

.sku-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sku-opt {
  padding: 6px 14px;
  background: var(--color-bg);
  border: 1px solid var(--color-bg-3);
  border-radius: 16px;
  font-size: 12px;
  color: var(--color-ink-2);
  &.active {
    color: var(--color-primary);
    border-color: var(--color-primary);
    background: var(--color-primary-50);
  }
}

.sku-bottom {
  margin-top: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding-top: 12px;
}

.empty-wrap { padding: 80px 0; }
</style>
