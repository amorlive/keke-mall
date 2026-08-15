<template>
  <div class="app-root">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'" mode="out-in">
        <keep-alive :include="['Home', 'Category', 'Cart', 'User']">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>

    <!-- 底部 Tabbar（仅主 tab 页面显示） -->
    <van-tabbar
      v-if="showTabbar"
      v-model="activeTab"
      route
      active-color="var(--color-primary)"
      inactive-color="var(--color-ink-3)"
    >
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref(0)

const showTabbar = computed(() => route.meta?.showTabbar !== false)

watch(() => route.path, (path) => {
  if (path === '/') activeTab.value = 0
  else if (path === '/category') activeTab.value = 1
  else if (path === '/cart') activeTab.value = 2
  else if (path === '/user') activeTab.value = 3
})
</script>

<style lang="scss">
.app-root {
  min-height: 100vh;
  position: relative;
}

.van-tabbar {
  border-top: 1px solid var(--color-ink-4);
  background: var(--color-bg-2);
}

.van-tabbar-item__text {
  font-size: var(--text-xs);
}

// 路由过渡
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.25s; }
.slide-enter-from { transform: translateX(100%); }
.slide-leave-to { transform: translateX(-30%); }
</style>
