<template>
  <div class="page user-group">
    <van-nav-bar title="我的拼团" left-arrow @click-left="$router.back()" :border="false" />
    <van-tabs v-model:active="active" sticky color="var(--color-primary)">
      <van-tab title="进行中" name="active" />
      <van-tab title="已成团" name="done" />
      <van-tab title="已失败" name="fail" />
    </van-tabs>
    <div class="list">
      <div v-for="g in list" :key="g.id" class="g-card">
        <img :src="g.cover" class="g-cover" />
        <div class="g-info">
          <div class="g-name">{{ g.goodsName }}</div>
          <div class="g-time">{{ g.time }}</div>
          <div class="g-status">
            <span :class="['gs-tag', g.status === '已成团' ? 'success' : g.status === '拼团中' ? 'primary' : 'fail']">{{ g.status }}</span>
            <span v-if="g.status === '拼团中'" class="g-need">还差 <span class="hl">{{ g.need - g.joined }}</span> 人</span>
          </div>
          <div class="g-actions">
            <div v-if="g.status === '拼团中'" class="g-btn primary" @click="$router.push(`/group/detail/${g.id}`)">邀请好友</div>
            <div v-if="g.status === '已成团'" class="g-btn" @click="$router.push('/user/orders')">查看订单</div>
            <div v-if="g.status === '拼团中'" class="g-btn">团详情</div>
          </div>
        </div>
      </div>
      <van-empty v-if="!list.length" description="暂无拼团记录" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { myGroup } from '@/data/mock'

const active = ref('active')
const list = computed(() => {
  if (active.value === 'active') return myGroup.filter(g => g.status === '拼团中')
  if (active.value === 'done') return myGroup.filter(g => g.status === '已成团')
  return myGroup.filter(g => g.status === '已失败')
})
</script>

<style lang="scss" scoped>
.user-group { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }
:deep(.van-tabs__wrap) { background: var(--color-bg); position: sticky; top: 46px; z-index: 9; }

.list { padding: 12px; }
.g-card { display: flex; background: var(--color-bg-2); border-radius: var(--radius-md); padding: 10px; gap: 10px; margin-bottom: 10px; }
.g-cover { width: 88px; height: 88px; border-radius: 6px; object-fit: cover; }
.g-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
.g-name { font-size: 13px; font-weight: 500; }
.g-time { font-size: 10px; color: var(--color-ink-3); }
.g-status { display: flex; align-items: center; gap: 6px; }
.gs-tag { font-size: 10px; padding: 2px 6px; border-radius: 4px; &.primary { background: var(--color-primary-50); color: var(--color-primary); } &.success { background: #E8F0E8; color: #4A6B4A; } &.fail { background: #F0E0E0; color: #B23A3A; } }
.g-need { font-size: 10px; color: var(--color-ink-3); .hl { color: var(--color-primary); font-weight: 700; } }
.g-actions { display: flex; gap: 6px; margin-top: auto; }
.g-btn { padding: 3px 10px; border: 1px solid var(--color-ink-4); border-radius: 12px; font-size: 11px; color: var(--color-ink-2); &.primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; border: none; } }
</style>
