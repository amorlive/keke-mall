<template>
  <div class="page user-fav">
    <van-nav-bar title="我的收藏" left-arrow @click-left="$router.back()" :border="false" />
    <div class="edit-bar">
      <span>{{ edit ? '完成' : '编辑' }}</span>
    </div>
    <div class="grid">
      <goods-card v-for="g in favList" :key="g.id" :goods="g" @click="$router.push(`/goods/${g.id}`)" />
    </div>
    <van-empty v-if="!favList.length" description="还没有收藏" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GoodsCard from '@/components/GoodsCard.vue'
import { goodsList } from '@/data/mock'

const edit = ref(false)
const favList = goodsList.slice(0, 6)
</script>

<style lang="scss" scoped>
.user-fav { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }
.edit-bar { text-align: right; padding: 8px 16px; color: var(--color-primary); font-size: 12px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px; }
</style>
