<template>
  <div class="page category">
    <!-- 顶部 -->
    <div class="cat-header">
      <div class="cat-title">商品分类</div>
      <van-search
        v-model="kw"
        placeholder="搜索商品"
        background="transparent"
        shape="round"
        @click-input="$router.push('/goods/list')"
      />
    </div>

    <!-- 左右分栏 -->
    <div class="cat-body">
      <div class="left">
        <div
          v-for="c in categories"
          :key="c.id"
          :class="['left-item', { active: activeId === c.id }]"
          @click="activeId = c.id"
        >
          <div class="left-icon">{{ c.icon }}</div>
          <div class="left-name">{{ c.name }}</div>
        </div>
      </div>
      <div class="right">
        <div class="banner">
          <div class="banner-title">{{ activeCat?.name }}系列</div>
          <div class="banner-sub">共 {{ activeGoods.length }} 款好物</div>
        </div>
        <div class="right-grid">
          <goods-card
            v-for="g in activeGoods"
            :key="g.id"
            :goods="g"
            @click="$router.push(`/goods/${g.id}`)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GoodsCard from '@/components/GoodsCard.vue'
import { categories, goodsList } from '@/data/mock'

const kw = ref('')
const activeId = ref(1)
const activeCat = computed(() => categories.find(c => c.id === activeId.value))
const activeGoods = computed(() => goodsList.filter(g => g.category === activeId.value))
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.cat-header {
  background: var(--color-primary);
  color: #F5EFE6;
  padding: 16px 16px 8px;
}

.cat-title {
  font-family: var(--font-serif);
  font-size: 20px;
  letter-spacing: 0.2em;
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
}

:deep(.van-search) {
  padding: 0;
  .van-search__content { background: rgba(255, 255, 255, 0.15); }
  .van-search__input { color: #F5EFE6; &::placeholder { color: rgba(245, 239, 230, 0.6); } }
  .van-icon { color: var(--color-gold) !important; }
}

.cat-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.left {
  width: 96px;
  background: var(--color-bg-3);
  overflow-y: auto;
}

.left-item {
  padding: 16px 8px;
  text-align: center;
  position: relative;
  color: var(--color-ink-2);
  &.active {
    background: var(--color-bg);
    color: var(--color-primary);
    font-weight: 600;
    &::before {
      content: '';
      position: absolute;
      left: 0; top: 50%;
      transform: translateY(-50%);
      width: 3px; height: 20px;
      background: var(--color-primary);
      border-radius: 0 2px 2px 0;
    }
  }
}

.left-icon { font-size: 22px; margin-bottom: 4px; }
.left-name { font-size: 12px; }

.right {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.banner {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #F5EFE6;
  padding: 16px 18px;
  border-radius: var(--radius-lg);
  margin-bottom: 12px;
  position: relative;
  overflow: hidden;
  &::after {
    content: '🌸';
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    font-size: 50px;
    opacity: 0.3;
  }
}

.banner-title {
  font-family: var(--font-serif);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.banner-sub {
  font-size: 11px;
  opacity: 0.8;
  margin-top: 4px;
}

.right-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
