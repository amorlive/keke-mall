<template>
  <div class="page cart-page">
    <div class="cart-header">
      <div class="cart-title">购物车</div>
      <div class="cart-tip" v-if="!cartList.length">还没有商品，去逛逛吧 👀</div>
      <div class="cart-edit" @click="edit = !edit" v-else>{{ edit ? '完成' : '编辑' }}</div>
    </div>

    <div class="recommend" v-if="!cartList.length">
      <div class="reco-title">— 掌柜推荐 —</div>
      <div class="reco-grid">
        <goods-card
          v-for="g in recommend"
          :key="g.id"
          :goods="g"
          @click="$router.push(`/goods/${g.id}`)"
        />
      </div>
    </div>

    <div v-else class="cart-list">
      <div
        v-for="(c, i) in cartList"
        :key="i"
        class="cart-item"
        :class="{ checked: c.checked }"
      >
        <van-checkbox v-model="c.checked" checked-color="var(--color-primary)" />
        <img :src="c.cover" class="ci-img" @click="$router.push(`/goods/${c.goodsId}`)" />
        <div class="ci-info">
          <div class="ci-name">{{ c.name }}</div>
          <div class="ci-spec">{{ c.spec }}</div>
          <div class="ci-bottom">
            <div class="ci-price">¥{{ c.price }}</div>
            <van-stepper v-model="c.qty" min="1" :max="99" @change="onChange" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="cartList.length" class="guess-section">
      <div class="guess-title">— 猜你喜欢 —</div>
      <div class="reco-grid">
        <goods-card
          v-for="g in recommend.slice(0, 4)"
          :key="g.id"
          :goods="g"
          @click="$router.push(`/goods/${g.id}`)"
        />
      </div>
    </div>

    <!-- 提交栏 -->
    <van-submit-bar
      v-if="cartList.length"
      :price="total * 100"
      :button-text="edit ? '删除' : '结算'"
      :button-color="edit ? '#B23A3A' : 'var(--color-primary)'"
      @submit="onSubmit"
    >
      <van-checkbox v-model="allChecked" @change="onAllCheck" checked-color="var(--color-primary)">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import GoodsCard from '@/components/GoodsCard.vue'
import { goodsList, findGoods } from '@/data/mock'

const router = useRouter()
const edit = ref(false)
const cartList = reactive([
  { goodsId: 1, name: '锦绣 · 朱砂发卡', spec: '朱砂红 / 中号 8cm', cover: findGoods(1).cover, price: 39, qty: 1, checked: true },
  { goodsId: 3, name: '缠枝 · 宋锦手链', spec: '朱砂 / 16cm', cover: findGoods(3).cover, price: 88, qty: 1, checked: true }
])

const recommend = computed(() => goodsList.filter(g => g.tags?.includes('热卖')))

const allChecked = computed({
  get: () => cartList.every(c => c.checked),
  set: () => {}
})

const total = computed(() =>
  cartList.filter(c => c.checked).reduce((sum, c) => sum + c.price * c.qty, 0)
)

function onAllCheck(val) {
  cartList.forEach(c => c.checked = val)
}

function onChange() { /* mock */ }

function onSubmit() {
  if (edit.value) {
    showConfirmDialog({ title: '确认删除', message: '删除所选商品？' })
      .then(() => {
        for (let i = cartList.length - 1; i >= 0; i--) {
          if (cartList[i].checked) cartList.splice(i, 1)
        }
        showToast('已删除')
        if (!cartList.length) edit.value = false
      })
      .catch(() => {})
  } else {
    if (total.value <= 0) return showToast('请选择商品')
    router.push('/checkout')
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: 100vh;
  padding-bottom: 100px;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--color-primary);
  color: #F5EFE6;
}

.cart-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.2em;
}

.cart-tip { font-size: 12px; opacity: 0.85; }
.cart-edit { font-size: 13px; padding: 4px 0; }

.recommend, .guess-section { padding: 16px; }

.reco-title, .guess-title {
  text-align: center;
  font-family: var(--font-serif);
  color: var(--color-ink-3);
  font-size: 14px;
  letter-spacing: 0.3em;
  margin-bottom: 16px;
}

.reco-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.cart-list {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cart-item {
  display: flex;
  gap: 10px;
  background: var(--color-bg-2);
  padding: 10px;
  border-radius: var(--radius-md);
  align-items: center;
  transition: opacity 0.2s;
  &.checked { opacity: 1; }
  &:not(.checked) { opacity: 0.6; }
}

.ci-img {
  width: 84px; height: 84px;
  border-radius: 6px;
  object-fit: cover;
}

.ci-info { flex: 1; min-width: 0; }
.ci-name { font-size: 13px; line-height: 1.3; }
.ci-spec { font-size: 11px; color: var(--color-ink-3); margin-top: 4px; }
.ci-bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 8px; }
.ci-price { color: var(--color-primary); font-weight: 600; font-size: 15px; }

.guess-section { margin-top: 16px; }

:deep(.van-submit-bar) {
  bottom: 50px;
  border-top: 1px solid var(--color-bg-3);
}
</style>
