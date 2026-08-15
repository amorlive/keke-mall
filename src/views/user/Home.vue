<template>
  <div class="page home">
    <!-- 顶部品牌区 -->
    <div class="brand-header">
      <div class="brand-row">
        <div class="brand">
          <div class="brand-mark">可</div>
          <div class="brand-text">
            <div class="brand-name">可可手作</div>
            <div class="brand-slogan">一寸宋锦 · 一寸心意</div>
          </div>
        </div>
        <div class="header-actions">
          <van-icon name="envelop-o" size="20" @click="$router.push('/user/distribution')" />
        </div>
      </div>
      <van-search
        v-model="searchKw"
        placeholder="搜索 发卡 / 抓夹 / 手链…"
        background="transparent"
        shape="round"
        @click-input="$router.push('/goods/list')"
      />
    </div>

    <!-- 轮播图 -->
    <div class="banner-wrap">
      <van-swipe :autoplay="4000" indicator-color="var(--color-gold)">
        <van-swipe-item v-for="b in banners" :key="b.id">
          <div class="banner" :style="{ background: b.bg }">
            <div class="banner-text">
              <div class="banner-title">{{ b.title }}</div>
              <div class="banner-sub">{{ b.subtitle }}</div>
              <div class="banner-btn">{{ b.btn }}</div>
            </div>
            <div class="banner-deco">{{ b.deco }}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 8 大分类 -->
    <div class="category-grid">
      <div
        v-for="c in categories"
        :key="c.id"
        class="cat-item"
        @click="goCategory(c.id)"
      >
        <div class="cat-icon">{{ c.icon }}</div>
        <div class="cat-name">{{ c.name }}</div>
      </div>
    </div>

    <!-- 营销入口：拼团 + 接龙 + 分销 -->
    <div class="promo-cards">
      <div class="promo-card group" @click="$router.push('/group/list')">
        <div class="promo-icon">👯</div>
        <div class="promo-text">
          <div class="promo-title">2 人拼团</div>
          <div class="promo-sub">立省 30% 起</div>
        </div>
        <div class="promo-arrow">›</div>
      </div>
      <div class="promo-card jielong" @click="$router.push('/jielong/list')">
        <div class="promo-icon">🐉</div>
        <div class="promo-text">
          <div class="promo-title">接龙爆款</div>
          <div class="promo-sub">群内限时成单</div>
        </div>
        <div class="promo-arrow">›</div>
      </div>
    </div>

    <!-- 接龙专区 -->
    <div class="block">
      <div class="block-header">
        <div class="block-title">
          <span class="title-cn">🔥 热门接龙</span>
          <span class="title-en">JIE LONG</span>
        </div>
        <div class="block-more" @click="$router.push('/jielong/list')">查看全部 ›</div>
      </div>
      <div class="jielong-list">
        <div
          v-for="jl in jieLongList.slice(0, 2)"
          :key="jl.id"
          class="jielong-card"
          @click="$router.push(`/jielong/detail/${jl.id}`)"
        >
          <img :src="jl.cover" class="jl-cover" />
          <div class="jl-info">
            <div class="jl-title">{{ jl.title }}</div>
            <div class="jl-progress">
              <div class="jl-progress-bar">
                <div class="jl-progress-fill" :style="{ width: (jl.currentCount / jl.targetCount * 100) + '%' }"></div>
              </div>
              <div class="jl-progress-text">{{ jl.currentCount }}/{{ jl.targetCount }} 件</div>
            </div>
            <div class="jl-footer">
              <div class="jl-time">⏰ {{ timeLeft(jl.deadline) }} 后截止</div>
              <div class="jl-btn">去跟单 ›</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 拼团专区 -->
    <div class="block">
      <div class="block-header">
        <div class="block-title">
          <span class="title-cn">👯 火热拼团</span>
          <span class="title-en">PIN TUAN</span>
        </div>
        <div class="block-more" @click="$router.push('/group/list')">更多拼团 ›</div>
      </div>
      <div class="group-list">
        <div
          v-for="g in groupList"
          :key="g.id"
          class="group-card"
          @click="$router.push(`/group/detail/${g.id}`)"
        >
          <img :src="g.cover" class="g-cover" />
          <div class="g-info">
            <div class="g-name">{{ g.name }}</div>
            <div class="g-people">还差 <span class="hl">{{ g.peopleNeeded - g.joined }}</span> 人成团</div>
            <div class="g-price">
              <span class="price-symbol">¥</span>{{ g.price }}
              <span class="price-old">¥{{ g.originalPrice }}</span>
            </div>
            <div class="g-btn">去拼团 ›</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐商品 -->
    <div class="block">
      <div class="block-header">
        <div class="block-title">
          <span class="title-cn">✨ 掌柜推荐</span>
          <span class="title-en">RECOMMEND</span>
        </div>
        <div class="block-more" @click="$router.push('/goods/list')">全部商品 ›</div>
      </div>
      <div class="goods-grid">
        <goods-card
          v-for="g in recommend"
          :key="g.id"
          :goods="g"
          @click="$router.push(`/goods/${g.id}`)"
        />
      </div>
    </div>

    <!-- 底部声明 -->
    <div class="footer-tip">
      <div>— 已到底部 —</div>
      <div class="footer-brand">可可手作 · 用心做好每一件</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GoodsCard from '@/components/GoodsCard.vue'
import { categories, goodsList, groupList, jieLongList } from '@/data/mock'
import { timeLeft } from '@/utils/format'

const router = useRouter()
const searchKw = ref('')

const banners = [
  { id: 1, title: '宋锦新品上市', subtitle: '老缎新作 · 限量首发', btn: '立即抢购', bg: 'linear-gradient(135deg, #7A2E2A 0%, #5A1F1C 100%)', deco: '🌸' },
  { id: 2, title: '拼团立省 30%', subtitle: '2-3 人成团享低价', btn: '去开团', bg: 'linear-gradient(135deg, #C9A961 0%, #A88845 100%)', deco: '👯' },
  { id: 3, title: '春日接龙专场', subtitle: '群内限时成单', btn: '去看看', bg: 'linear-gradient(135deg, #6B8E6B 0%, #4A6B4A 100%)', deco: '🐉' }
]

const recommend = computed(() => goodsList.filter(g => g.tags?.includes('热卖') || g.tags?.includes('推荐')))

function goCategory(id) {
  router.push({ path: '/goods/list', query: { cat: id } })
}
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 80px;
}

.brand-header {
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: #F5EFE6;
  padding: 20px 16px 8px;
  border-radius: 0 0 20px 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0 0 20px 20px;
    background:
      radial-gradient(circle at 20% 20%, rgba(201, 169, 97, 0.15) 0%, transparent 30%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 30%);
    pointer-events: none;
  }
}

.brand-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 38px; height: 38px;
  background: var(--color-gold);
  color: var(--color-primary-dark);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.brand-text { display: flex; flex-direction: column; }

.brand-name {
  font-family: var(--font-serif);
  font-size: 18px;
  letter-spacing: 0.15em;
  font-weight: 600;
}

.brand-slogan {
  font-size: 10px;
  color: rgba(245, 239, 230, 0.7);
  letter-spacing: 0.1em;
  margin-top: 2px;
}

.header-actions {
  display: flex;
  gap: 14px;
  .van-icon { padding: 6px; }
}

:deep(.van-search) {
  position: relative;
  z-index: 1;
  padding: 0;
  .van-search__content {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(201, 169, 97, 0.3);
  }
  .van-search__input {
    color: #F5EFE6;
    &::placeholder { color: rgba(245, 239, 230, 0.6); }
  }
  .van-icon { color: var(--color-gold) !important; }
}

.banner-wrap {
  margin: 12px 16px 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.banner {
  height: 140px;
  padding: 20px 24px;
  position: relative;
  color: #F5EFE6;
  display: flex;
  align-items: center;
}

.banner-text {
  position: relative;
  z-index: 1;
}

.banner-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}

.banner-sub {
  font-size: 12px;
  opacity: 0.85;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.banner-btn {
  display: inline-block;
  padding: 4px 14px;
  background: var(--color-gold);
  color: var(--color-primary-dark);
  border-radius: 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.banner-deco {
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 72px;
  opacity: 0.4;
}

.category-grid {
  margin: 16px;
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  padding: 16px 8px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 4px;
  box-shadow: var(--shadow-sm);
}

.cat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.cat-icon {
  width: 44px; height: 44px;
  background: var(--color-bg-3);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  transition: transform 0.2s;
  &:active { transform: scale(0.9); }
}

.cat-name {
  font-size: 11px;
  color: var(--color-ink-2);
}

.promo-cards {
  margin: 0 16px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.promo-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: var(--radius-lg);
  color: #F5EFE6;
  position: relative;
  &.group { background: linear-gradient(135deg, #7A2E2A, #5A1F1C); }
  &.jielong { background: linear-gradient(135deg, #6B8E6B, #4A6B4A); }
}

.promo-icon { font-size: 28px; }

.promo-text { flex: 1; }
.promo-title { font-size: 15px; font-weight: 600; }
.promo-sub { font-size: 11px; opacity: 0.85; margin-top: 2px; }

.promo-arrow { font-size: 22px; opacity: 0.7; }

.block {
  margin: 0 16px 16px;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  padding: 0 4px;
}

.block-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  .title-cn {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 600;
    color: var(--color-ink);
    letter-spacing: 0.08em;
  }
  .title-en {
    font-size: 10px;
    color: var(--color-gold);
    letter-spacing: 0.2em;
  }
}

.block-more {
  font-size: 12px;
  color: var(--color-ink-3);
}

.jielong-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.jielong-card {
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.jl-cover {
  width: 100%;
  aspect-ratio: 1.5;
  object-fit: cover;
  display: block;
}

.jl-info {
  padding: 10px;
}

.jl-title {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-ink);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 34px;
  margin-bottom: 8px;
}

.jl-progress {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.jl-progress-bar {
  flex: 1;
  height: 4px;
  background: var(--color-bg-3);
  border-radius: 2px;
  overflow: hidden;
}

.jl-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold), var(--color-primary));
  border-radius: 2px;
}

.jl-progress-text {
  font-size: 10px;
  color: var(--color-ink-3);
  white-space: nowrap;
}

.jl-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: var(--color-ink-3);
  .jl-time { color: var(--color-primary); }
  .jl-btn {
    color: var(--color-primary);
    font-weight: 600;
  }
}

.group-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.group-card {
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.g-cover {
  width: 100%;
  aspect-ratio: 1.3;
  object-fit: cover;
}

.g-info {
  padding: 10px;
}

.g-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-ink);
  line-height: 1.4;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.g-people {
  font-size: 10px;
  color: var(--color-ink-3);
  .hl { color: var(--color-primary); font-weight: 600; }
  margin-bottom: 6px;
}

.g-price {
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  .price-symbol { font-size: 0.7em; }
  .price-old { color: var(--color-ink-3); text-decoration: line-through; font-size: 10px; margin-left: 4px; font-weight: 400; }
}

.g-btn {
  text-align: center;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  border-radius: 14px;
  padding: 4px 0;
  font-size: 11px;
  letter-spacing: 0.1em;
}

.goods-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.footer-tip {
  text-align: center;
  padding: 24px 0 40px;
  color: var(--color-ink-3);
  font-size: 11px;
  letter-spacing: 0.2em;
  .footer-brand {
    margin-top: 8px;
    font-family: var(--font-serif);
    color: var(--color-gold);
    font-size: 12px;
  }
}
</style>
