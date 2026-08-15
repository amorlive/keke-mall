<template>
  <div class="page goods-list">
    <van-nav-bar
      title="商品列表"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <van-search
      v-model="kw"
      placeholder="搜索 商品 / 系列"
      background="var(--color-primary)"
      shape="round"
    />

    <div class="filter-bar">
      <div :class="['filter-item', { active: filter.sort === 'default' }]" @click="filter.sort = 'default'">综合</div>
      <div :class="['filter-item', { active: filter.sort === 'sales' }]" @click="filter.sort = 'sales'">销量</div>
      <div :class="['filter-item', { active: filter.sort === 'price' || filter.sort === 'price-desc' }]" @click="togglePrice">
        价格
        <span class="caret">⇅</span>
      </div>
      <div :class="['filter-item', { active: filter.onSale }]" @click="filter.onSale = !filter.onSale">
        促销
        <span v-if="filter.onSale" class="dot"></span>
      </div>
    </div>

    <div class="grid">
      <goods-card
        v-for="g in filtered"
        :key="g.id"
        :goods="g"
        @click="$router.push(`/goods/${g.id}`)"
      />
    </div>

    <div v-if="!filtered.length" class="empty-wrap">
      <van-empty description="没有找到相关商品" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import GoodsCard from '@/components/GoodsCard.vue'
import { goodsList } from '@/data/mock'

const route = useRoute()
const kw = ref('')
const filter = reactive({ sort: 'default', onSale: false })

function togglePrice() {
  if (filter.sort === 'price') filter.sort = 'price-desc'
  else filter.sort = 'price'
}

const filtered = computed(() => {
  let arr = [...goodsList]
  const cat = Number(route.query.cat)
  if (cat) arr = arr.filter(g => g.category === cat)
  if (kw.value) arr = arr.filter(g => g.name.includes(kw.value) || g.brief?.includes(kw.value))
  if (filter.onSale) arr = arr.filter(g => g.isGroup || g.isJieLong)
  if (filter.sort === 'sales') arr.sort((a, b) => b.sales - a.sales)
  if (filter.sort === 'price') arr.sort((a, b) => a.price - b.price)
  if (filter.sort === 'price-desc') arr.sort((a, b) => b.price - a.price)
  return arr
})
</script>

<style lang="scss" scoped>
.goods-list {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 40px;
}

:deep(.van-nav-bar) {
  background: var(--color-primary);
  .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; }
  .van-hairline--bottom::after { border: none; }
}

:deep(.van-search) {
  background: var(--color-primary);
  padding: 0 16px 8px;
  .van-search__content { background: rgba(255, 255, 255, 0.95); }
}

.filter-bar {
  display: flex;
  background: var(--color-bg-2);
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 9;
  box-shadow: var(--shadow-sm);
}

.filter-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: var(--color-ink-2);
  position: relative;
  &.active { color: var(--color-primary); font-weight: 600; }
  .caret { font-size: 10px; margin-left: 2px; }
  .dot {
    position: absolute;
    top: 2px; right: calc(50% - 22px);
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--color-primary);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 12px;
}

.empty-wrap {
  padding: 60px 0;
}
</style>
