<template>
  <div class="page user-coupon">
    <van-nav-bar title="我的优惠券" left-arrow @click-left="$router.back()" :border="false" />
    <van-tabs v-model:active="active" sticky color="var(--color-primary)">
      <van-tab title="未使用" name="unused" />
      <van-tab title="已使用" name="used" />
      <van-tab title="已过期" name="expired" />
    </van-tabs>
    <div class="coupon-list">
      <div v-for="c in list" :key="c.id" class="coupon">
        <div class="c-left">
          <div class="c-amount">
            <span class="c-sym">¥</span>{{ c.amount }}
          </div>
          <div class="c-condition">满 {{ c.condition }} 可用</div>
        </div>
        <div class="c-divider"></div>
        <div class="c-right">
          <div class="c-name">{{ c.name }}</div>
          <div class="c-expire">有效期至 {{ c.expire }}</div>
          <div class="c-use" v-if="c.status === 'unused'">立即使用 ›</div>
        </div>
      </div>
      <van-empty v-if="!list.length" description="暂无优惠券" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { coupons } from '@/data/mock'

const active = ref('unused')
const list = computed(() => coupons.filter(c => c.status === active.value))
</script>

<style lang="scss" scoped>
.user-coupon { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }
:deep(.van-tabs__wrap) { background: var(--color-bg); position: sticky; top: 46px; z-index: 9; }

.coupon-list { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.coupon { display: flex; background: var(--color-bg-2); border-radius: var(--radius-md); overflow: hidden; }
.c-left { width: 110px; background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; text-align: center; padding: 16px 0; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.c-amount { font-size: 32px; font-weight: 700; font-family: var(--font-serif); .c-sym { font-size: 0.5em; vertical-align: 8px; } }
.c-condition { font-size: 11px; opacity: 0.85; }
.c-divider { width: 1px; background-image: linear-gradient(to bottom, var(--color-bg-3) 50%, transparent 50%); background-size: 1px 8px; }
.c-right { flex: 1; padding: 14px; display: flex; flex-direction: column; justify-content: center; }
.c-name { font-size: 14px; font-weight: 500; }
.c-expire { font-size: 11px; color: var(--color-ink-3); margin-top: 4px; }
.c-use { font-size: 11px; color: var(--color-primary); margin-top: 6px; }
</style>
