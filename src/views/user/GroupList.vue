<template>
  <div class="page group-list">
    <van-nav-bar
      title="🔥 火热拼团"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <div class="hero">
      <div class="hero-text">
        <div class="hero-title">👯 拼团更划算</div>
        <div class="hero-sub">2-3 人成团，立享团购价</div>
      </div>
      <div class="hero-rule">玩法说明 ›</div>
    </div>

    <div class="section">
      <div class="sec-title">— 进行中的团 —</div>
      <div class="list">
        <div
          v-for="g in groupList"
          :key="g.id"
          class="g-card"
          @click="$router.push(`/group/detail/${g.id}`)"
        >
          <img :src="g.cover" class="g-cover" />
          <div class="g-info">
            <div class="g-name">{{ g.name }}</div>
            <div class="g-prices">
              <span class="g-price">¥{{ g.price }}</span>
              <span class="g-old">¥{{ g.originalPrice }}</span>
              <span class="g-save">立省 ¥{{ g.originalPrice - g.price }}</span>
            </div>
            <div class="g-bar">
              <div class="g-bar-inner">
                <div class="g-bar-fill" :style="{ width: (g.joined / g.peopleNeeded * 100) + '%' }"></div>
              </div>
              <div class="g-bar-text">{{ g.joined }}/{{ g.peopleNeeded }} 人</div>
            </div>
            <div class="g-time">⏰ 还剩 {{ timeLeft(g.expireAt) }} 结束</div>
            <div class="g-btn">去拼团 ›</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rule">
      <div class="rule-title">— 拼团玩法 —</div>
      <div class="rule-step"><span class="num">1</span>选择心仪商品，发起拼团</div>
      <div class="rule-step"><span class="num">2</span>邀请好友 扫码参团</div>
      <div class="rule-step"><span class="num">3</span>人数凑齐 自动成团发货</div>
      <div class="rule-step"><span class="num">4</span>未成团 自动退款</div>
    </div>
  </div>
</template>

<script setup>
import { groupList } from '@/data/mock'
import { timeLeft } from '@/utils/format'
</script>

<style lang="scss" scoped>
.group-list {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 40px;
}

:deep(.van-nav-bar) {
  background: var(--color-primary);
  .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; }
  .van-hairline--bottom::after { border: none; }
}

.hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #F5EFE6;
  margin: 12px;
  padding: 16px;
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.hero-sub { font-size: 11px; opacity: 0.85; margin-top: 4px; }
.hero-rule { font-size: 11px; opacity: 0.8; padding: 4px 8px; border: 1px solid rgba(245, 239, 230, 0.4); border-radius: 12px; }

.section { padding: 0 12px; }

.sec-title {
  font-family: var(--font-serif);
  text-align: center;
  color: var(--color-ink-3);
  font-size: 12px;
  letter-spacing: 0.3em;
  margin: 12px 0;
}

.list { display: flex; flex-direction: column; gap: 10px; }

.g-card {
  display: flex;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.g-cover { width: 110px; height: 130px; object-fit: cover; flex-shrink: 0; }

.g-info { flex: 1; padding: 10px; display: flex; flex-direction: column; min-width: 0; }

.g-name { font-size: 13px; font-weight: 500; line-height: 1.3; }

.g-prices {
  margin-top: 6px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.g-price { color: var(--color-primary); font-size: 18px; font-weight: 700; }
.g-old { color: var(--color-ink-3); text-decoration: line-through; font-size: 11px; }
.g-save {
  font-size: 10px;
  color: var(--color-primary);
  background: var(--color-primary-50);
  padding: 1px 5px;
  border-radius: 3px;
}

.g-bar { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
.g-bar-inner { flex: 1; height: 4px; background: var(--color-bg-3); border-radius: 2px; overflow: hidden; }
.g-bar-fill { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-primary)); border-radius: 2px; }
.g-bar-text { font-size: 10px; color: var(--color-ink-3); }

.g-time { font-size: 10px; color: var(--color-primary); margin-top: 4px; }

.g-btn {
  margin-top: auto;
  text-align: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  border-radius: 14px;
  padding: 4px 0;
  font-size: 12px;
  letter-spacing: 0.1em;
}

.rule {
  margin: 24px 12px 0;
  padding: 16px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.rule-title {
  font-family: var(--font-serif);
  text-align: center;
  color: var(--color-ink-3);
  font-size: 12px;
  letter-spacing: 0.3em;
  margin-bottom: 14px;
}

.rule-step {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 4px 0;
  color: var(--color-ink-2);
  .num {
    width: 20px; height: 20px;
    background: var(--color-primary);
    color: #F5EFE6;
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 11px;
    margin-right: 8px;
  }
}
</style>
