<template>
  <div class="page user-jl">
    <van-nav-bar title="我的接龙" left-arrow @click-left="$router.back()" :border="false" />
    <van-tabs v-model:active="active" sticky color="var(--color-primary)">
      <van-tab title="进行中" name="active" />
      <van-tab title="已截止" name="end" />
    </van-tabs>
    <div class="list">
      <div v-for="jl in list" :key="jl.id" class="jl-card">
        <div class="jl-title">{{ jl.title }}</div>
        <div class="jl-meta">
          <span :class="['jl-status', jl.status === '进行中' ? 'active' : 'end']">{{ jl.status }}</span>
          <span class="jl-deadline">⏰ {{ jl.deadline }}</span>
        </div>
        <div class="jl-progress">
          <div class="jp-bar"><div class="jp-fill" :style="{ width: (jl.currentCount / jl.targetCount * 100) + '%' }"></div></div>
          <div class="jp-text">{{ jl.currentCount }}/{{ jl.targetCount }} 件</div>
        </div>
        <div class="jl-actions">
          <div v-if="jl.status === '进行中'" class="jl-btn primary" @click="$router.push(`/jielong/detail/${jl.id}`)">查看详情</div>
          <div v-else class="jl-btn">已结束</div>
        </div>
      </div>
      <van-empty v-if="!list.length" description="暂无接龙记录" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { myJieLong } from '@/data/mock'

const active = ref('active')
const list = computed(() =>
  active.value === 'active' ? myJieLong.filter(j => j.status === '进行中') : myJieLong.filter(j => j.status === '已截止')
)
</script>

<style lang="scss" scoped>
.user-jl { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }
:deep(.van-tabs__wrap) { background: var(--color-bg); position: sticky; top: 46px; z-index: 9; }

.list { padding: 12px; }
.jl-card { background: var(--color-bg-2); border-radius: var(--radius-md); padding: 14px; margin-bottom: 10px; }
.jl-title { font-size: 14px; font-weight: 500; line-height: 1.4; }
.jl-meta { display: flex; justify-content: space-between; margin-top: 6px; }
.jl-status { font-size: 10px; padding: 2px 6px; border-radius: 4px; &.active { background: #E8F0E8; color: #4A6B4A; } &.end { background: var(--color-bg-3); color: var(--color-ink-3); } }
.jl-deadline { font-size: 10px; color: var(--color-ink-3); }
.jl-progress { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
.jp-bar { flex: 1; height: 6px; background: var(--color-bg-3); border-radius: 3px; overflow: hidden; }
.jp-fill { height: 100%; background: linear-gradient(90deg, var(--color-gold), var(--color-primary)); border-radius: 3px; }
.jp-text { font-size: 11px; color: var(--color-ink-3); }
.jl-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
.jl-btn { padding: 4px 14px; border: 1px solid var(--color-ink-4); border-radius: 14px; font-size: 11px; color: var(--color-ink-2); &.primary { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; border: none; } }
</style>
