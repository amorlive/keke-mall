<template>
  <div class="page user-orders">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.back()" :border="false" />
    <van-tabs v-model:active="active" sticky color="var(--color-primary)">
      <van-tab v-for="t in tabs" :key="t" :title="t" :name="t" />
    </van-tabs>
    <div class="order-list">
      <div v-for="o in filtered" :key="o.id" class="order-item">
        <div class="oi-top">
          <span class="oi-no">订单号：{{ o.id }}</span>
          <span class="oi-status" :class="o.status">{{ o.status }}</span>
        </div>
        <div class="oi-body" @click="showDetail(o)">
          <img :src="o.cover" class="oi-img" />
          <div class="oi-info">
            <div class="oi-name">{{ o.goodsName }}</div>
            <div class="oi-spec">规格：标准 / ×{{ o.count }}</div>
            <div class="oi-time">{{ o.createTime }}</div>
          </div>
          <div class="oi-right">
            <div class="oi-price">¥{{ o.total }}</div>
            <div class="oi-count">共 {{ o.count }} 件</div>
          </div>
        </div>
        <div class="oi-actions">
          <div class="oa-btn">查看详情</div>
          <div v-if="o.status === '待付款'" class="oa-btn primary">立即付款</div>
          <div v-if="o.status === '待发货'" class="oa-btn">提醒发货</div>
          <div v-if="o.status === '待收货'" class="oa-btn primary">确认收货</div>
          <div v-if="o.status === '已完成'" class="oa-btn">再次购买</div>
        </div>
      </div>
      <van-empty v-if="!filtered.length" description="暂无订单" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import { orders } from '@/data/mock'

const route = useRoute()
const tabs = ['全部', '待付款', '待发货', '待收货', '已完成']
const active = ref(route.query.status || '全部')

const filtered = computed(() =>
  active.value === '全部' ? orders : orders.filter(o => o.status === active.value)
)

function showDetail(o) { showToast(`订单 ${o.id}`) }
</script>

<style lang="scss" scoped>
.user-orders { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }
:deep(.van-tabs__wrap) { background: var(--color-bg); position: sticky; top: 46px; z-index: 9; }

.order-list { padding: 12px; }
.order-item { background: var(--color-bg-2); border-radius: var(--radius-md); margin-bottom: 10px; padding: 12px; }
.oi-top { display: flex; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px dashed var(--color-bg-3); }
.oi-no { font-size: 11px; color: var(--color-ink-3); }
.oi-status { font-size: 12px; font-weight: 600; &.待付款 { color: var(--color-gold); } &.待发货 { color: var(--color-primary); } &.待收货 { color: #6B7E8E; } &.已完成 { color: var(--color-ink-3); } }

.oi-body { display: flex; gap: 10px; padding: 10px 0; }
.oi-img { width: 80px; height: 80px; border-radius: 6px; object-fit: cover; }
.oi-info { flex: 1; }
.oi-name { font-size: 13px; font-weight: 500; }
.oi-spec { font-size: 11px; color: var(--color-ink-3); margin-top: 4px; }
.oi-time { font-size: 10px; color: var(--color-ink-3); margin-top: 4px; }
.oi-right { text-align: right; }
.oi-price { color: var(--color-primary); font-size: 14px; font-weight: 600; }
.oi-count { font-size: 10px; color: var(--color-ink-3); margin-top: 4px; }

.oi-actions { display: flex; justify-content: flex-end; gap: 8px; padding-top: 10px; border-top: 1px dashed var(--color-bg-3); }
.oa-btn { padding: 4px 10px; border: 1px solid var(--color-ink-4); border-radius: 14px; font-size: 11px; color: var(--color-ink-2); &.primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; border: none; } }
</style>
