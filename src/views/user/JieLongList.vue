<template>
  <div class="page jl-list">
    <van-nav-bar
      title="🐉 接龙专场"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <div class="hero">
      <div class="hero-text">
        <div class="hero-title">🐉 群内限时成单</div>
        <div class="hero-sub">掌柜发起 · 群友跟单 · 凑够人数享团购价</div>
      </div>
      <div class="hero-btn" @click="$router.push('/jielong/create')">+ 发起接龙</div>
    </div>

    <van-tabs v-model:active="active" sticky animated color="var(--color-primary)">
      <van-tab title="进行中" name="active" />
      <van-tab title="即将开始" name="soon" />
      <van-tab title="已结束" name="end" />
    </van-tabs>

    <div class="list">
      <div
        v-for="jl in jieLongList"
        :key="jl.id"
        class="jl-card"
        @click="$router.push(`/jielong/detail/${jl.id}`)"
      >
        <div class="jl-head">
          <img :src="jl.cover" class="jl-cover" />
          <div class="jl-badge">🔥 接龙中</div>
        </div>
        <div class="jl-info">
          <div class="jl-title">{{ jl.title }}</div>
          <div class="jl-initiator">
            <span class="init-avatar">{{ jl.initiator.avatar }}</span>
            <span class="init-name">{{ jl.initiator.nickname }} 发起</span>
          </div>
          <div class="jl-progress">
            <div class="jp-text">
              <span class="jp-num">{{ jl.currentCount }}</span>
              <span class="jp-total">/ {{ jl.targetCount }} 件</span>
            </div>
            <div class="jp-bar">
              <div class="jp-fill" :style="{ width: (jl.currentCount / jl.targetCount * 100) + '%' }"></div>
            </div>
          </div>
          <div class="jl-bottom">
            <div class="jl-price">¥{{ jl.price }} <span class="jl-deadline">⏰ {{ timeLeft(jl.deadline) }}后截止</span></div>
            <div class="jl-btn">去跟单 ›</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rule-block">
      <div class="rb-title">— 接龙玩法 —</div>
      <div class="rb-item">1. 掌柜在群内发起接龙</div>
      <div class="rb-item">2. 群友点击链接查看详情并下单</div>
      <div class="rb-item">3. 凑够目标件数即截单，商家统一发货</div>
      <div class="rb-item">4. 未成单的自动退款</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { jieLongList } from '@/data/mock'
import { timeLeft } from '@/utils/format'

const active = ref('active')
</script>

<style lang="scss" scoped>
.jl-list {
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
  background: linear-gradient(135deg, #6B8E6B, #4A6B4A);
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

.hero-btn {
  background: var(--color-gold);
  color: #4A6B4A;
  padding: 6px 14px;
  border-radius: 18px;
  font-size: 12px;
  font-weight: 600;
}

:deep(.van-tabs__wrap) {
  background: var(--color-bg);
  position: sticky;
  top: 46px;
  z-index: 9;
}

.list { padding: 12px; display: flex; flex-direction: column; gap: 12px; }

.jl-card {
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.jl-head { position: relative; }
.jl-cover { width: 100%; aspect-ratio: 1.8; object-fit: cover; display: block; }
.jl-badge {
  position: absolute;
  top: 10px; left: 10px;
  background: var(--color-primary);
  color: #F5EFE6;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  font-weight: 600;
}

.jl-info { padding: 12px; }

.jl-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-ink);
  line-height: 1.4;
  margin-bottom: 8px;
}

.jl-initiator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-ink-3);
  margin-bottom: 10px;
}

.init-avatar {
  width: 22px; height: 22px;
  background: var(--color-primary-50);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
}

.jl-progress { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.jp-num { color: var(--color-primary); font-size: 18px; font-weight: 700; }
.jp-total { color: var(--color-ink-3); font-size: 12px; }
.jp-bar { flex: 1; height: 6px; background: var(--color-bg-3); border-radius: 3px; overflow: hidden; }
.jp-fill { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-primary)); border-radius: 3px; }

.jl-bottom { display: flex; justify-content: space-between; align-items: center; }
.jl-price { color: var(--color-primary); font-size: 18px; font-weight: 700; }
.jl-deadline { color: var(--color-ink-3); font-size: 10px; font-weight: 400; margin-left: 8px; }
.jl-btn {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  letter-spacing: 0.1em;
}

.rule-block {
  margin: 0 12px;
  padding: 14px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.rb-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--color-ink-3);
  letter-spacing: 0.3em;
  margin-bottom: 10px;
}

.rb-item { font-size: 11px; color: var(--color-ink-2); padding: 3px 0; }
</style>
