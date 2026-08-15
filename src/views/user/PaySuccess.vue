<template>
  <div class="page pay-success">
    <div class="success-card">
      <div class="check-deco">✓</div>
      <div class="success-title">支付成功</div>
      <div class="success-sub">订单已提交，商家将尽快为您发货</div>

      <div class="order-info">
        <div class="oi-row">
          <span>订单编号</span>
          <span class="oi-val">o20260908{{ orderNo }}<span class="copy" @click="showToast('已复制')">复制</span></span>
        </div>
        <div class="oi-row">
          <span>支付方式</span>
          <span class="oi-val">微信支付</span>
        </div>
        <div class="oi-row">
          <span>支付金额</span>
          <span class="oi-val price">¥{{ total }}</span>
        </div>
        <div class="oi-row">
          <span>预计送达</span>
          <span class="oi-val">3-5 个工作日</span>
        </div>
      </div>

      <div class="actions">
        <div class="act-btn" @click="$router.push('/user/orders')">查看订单</div>
        <div class="act-btn primary" @click="$router.push('/')">返回首页</div>
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <div class="guess-title">— 猜你还喜欢 —</div>
      <div class="guess-grid">
        <goods-card
          v-for="g in recommend"
          :key="g.id"
          :goods="g"
          @click="$router.push(`/goods/${g.id}`)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import GoodsCard from '@/components/GoodsCard.vue'
import { goodsList } from '@/data/mock'

const orderNo = ref(String(Math.floor(Math.random() * 9000) + 1000))
const total = ref('114.14')
const recommend = computed(() => goodsList.filter(g => g.tags?.includes('热卖') || g.tags?.includes('推荐')).slice(0, 4))
</script>

<style lang="scss" scoped>
.pay-success {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 40px;
}

.success-card {
  margin: 24px 16px 0;
  padding: 32px 20px 24px;
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  text-align: center;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: -40px; left: 50%;
    transform: translateX(-50%);
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(122, 46, 42, 0.08) 0%, transparent 70%);
  }
}

.check-deco {
  width: 64px; height: 64px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px;
  font-weight: 700;
  margin: 0 auto 12px;
  position: relative;
  z-index: 1;
  box-shadow: 0 6px 20px rgba(122, 46, 42, 0.3);
}

.success-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-ink);
  position: relative;
  z-index: 1;
}

.success-sub {
  font-size: 12px;
  color: var(--color-ink-3);
  margin-top: 6px;
  position: relative;
  z-index: 1;
}

.order-info {
  margin: 20px 0;
  background: var(--color-bg);
  border-radius: var(--radius-md);
  padding: 12px;
  text-align: left;
}

.oi-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 6px 0;
  color: var(--color-ink-2);
}

.oi-val { color: var(--color-ink); display: flex; align-items: center; gap: 4px; }
.oi-val.price { color: var(--color-primary); font-weight: 600; font-size: 14px; }
.copy { font-size: 10px; color: var(--color-primary); padding: 1px 4px; border: 1px solid var(--color-primary); border-radius: 3px; }

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.act-btn {
  height: 40px;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px;
  letter-spacing: 0.1em;
  &.primary {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    color: #F5EFE6;
    border-color: transparent;
  }
}

.guess { padding: 24px 16px 0; }
.guess-title {
  text-align: center;
  font-family: var(--font-serif);
  color: var(--color-ink-3);
  font-size: 14px;
  letter-spacing: 0.3em;
  margin-bottom: 16px;
}

.guess-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
