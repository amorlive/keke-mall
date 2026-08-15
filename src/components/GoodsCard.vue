<template>
  <div class="goods-card" @click="$emit('click', goods)">
    <div class="cover">
      <img :src="goods.cover" :alt="goods.name" />
      <div class="tags">
        <span v-for="t in (goods.tags || []).slice(0, 2)" :key="t" class="tag" :class="tagClass(t)">{{ t }}</span>
      </div>
    </div>
    <div class="info">
      <div class="name">{{ goods.name }}</div>
      <div class="brief">{{ goods.brief }}</div>
      <div class="bottom">
        <div class="price">
          <span class="price-symbol">¥</span>{{ formatPrice(goods.price) }}
          <span v-if="goods.originalPrice > goods.price" class="price-old">¥{{ formatPrice(goods.originalPrice) }}</span>
        </div>
        <div class="sales">已售 {{ goods.sales }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/format'

defineProps({ goods: Object })
defineEmits(['click'])

function tagClass(t) {
  if (t === '拼团' || t === '接龙') return 'gold'
  if (t === '新品' || t === '热卖') return 'primary'
  if (t === '限量' || t === '套装' || t === '推荐') return 'gold'
  return 'default'
}
</script>

<style lang="scss" scoped>
.goods-card {
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  &:active {
    transform: scale(0.98);
    box-shadow: var(--shadow-md);
  }
}

.cover {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.tags {
  position: absolute;
  top: 8px; left: 8px;
  display: flex;
  gap: 4px;
  .tag {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    color: #fff;
    &.primary { background: var(--color-primary); }
    &.gold { background: var(--color-gold); }
    &.default { background: rgba(43, 33, 24, 0.5); }
  }
}

.info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--color-ink);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.brief {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 4px;
}

.price {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-primary);
  .price-symbol { font-size: 0.75em; }
  .price-old { color: var(--color-ink-3); text-decoration: line-through; font-size: var(--text-xs); margin-left: 4px; font-weight: 400; }
}

.sales {
  font-size: var(--text-xs);
  color: var(--color-ink-3);
}
</style>
