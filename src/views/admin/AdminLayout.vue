<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <div class="sb-brand">
        <div class="sb-mark">可</div>
        <div>
          <div class="sb-name">可可手作</div>
          <div class="sb-sub">掌柜后台</div>
        </div>
      </div>

      <nav class="sb-nav">
        <div
          v-for="g in navGroups"
          :key="g.title"
          class="nav-group"
        >
          <div class="ng-title">{{ g.title }}</div>
          <router-link
            v-for="item in g.items"
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: $route.path === item.path }"
          >
            <span class="ni-icon">{{ item.icon }}</span>
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </nav>

      <div class="sb-bottom">
        <div class="sb-link" @click="$router.push('/')">📱 移动端预览</div>
        <div class="sb-link" @click="onLogout">🚪 退出登录</div>
      </div>
    </aside>

    <!-- 主体 -->
    <main class="main">
      <header class="topbar">
        <div class="tb-title">{{ $route.meta?.title || '后台' }}</div>
        <div class="tb-info">
          <span class="tb-time">{{ now }}</span>
          <div class="tb-user">
            <div class="tb-avatar">🌸</div>
            <span>可可不加班</span>
          </div>
        </div>
      </header>
      <div class="content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { showConfirmDialog } from 'vant'

const router = useRouter()
const now = ref('')
let timer = null

const navGroups = [
  {
    title: '核心',
    items: [
      { name: '数据看板', path: '/admin/dashboard', icon: '📊' },
      { name: '商品管理', path: '/admin/goods', icon: '🛍️' },
      { name: '订单管理', path: '/admin/orders', icon: '📋' }
    ]
  },
  {
    title: '营销',
    items: [
      { name: '拼团管理', path: '/admin/group', icon: '👯' },
      { name: '接龙管理', path: '/admin/jielong', icon: '🐉' },
      { name: '营销中心', path: '/admin/marketing', icon: '🎁' }
    ]
  },
  {
    title: '运营',
    items: [
      { name: '会员管理', path: '/admin/user', icon: '👤' },
      { name: '店铺设置', path: '/admin/settings', icon: '⚙️' }
    ]
  }
]

function tick() {
  const d = new Date()
  now.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

onMounted(() => { tick(); timer = setInterval(tick, 60000) })
onUnmounted(() => { if (timer) clearInterval(timer) })

function onLogout() {
  showConfirmDialog({ title: '退出登录', message: '确认退出？' })
    .then(() => router.push('/login'))
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #F0EDE6;
}

.sidebar {
  width: 220px;
  background: linear-gradient(180deg, #5A1F1C 0%, #3D1614 100%);
  color: #F5EFE6;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
}

.sb-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 16px;
  border-bottom: 1px solid rgba(245, 239, 230, 0.1);
}

.sb-mark {
  width: 40px; height: 40px;
  background: var(--color-gold);
  color: var(--color-primary-dark);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
}

.sb-name { font-family: var(--font-serif); font-size: 15px; letter-spacing: 0.15em; }
.sb-sub { font-size: 10px; opacity: 0.7; margin-top: 2px; }

.sb-nav { flex: 1; padding: 12px 0; overflow-y: auto; }

.nav-group { margin-bottom: 12px; }
.ng-title { font-size: 10px; letter-spacing: 0.2em; color: rgba(245, 239, 230, 0.5); padding: 6px 16px; }

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 13px;
  color: rgba(245, 239, 230, 0.8);
  text-decoration: none;
  position: relative;
  transition: background 0.2s;
  &:hover { background: rgba(245, 239, 230, 0.05); color: #F5EFE6; }
  &.active {
    background: rgba(201, 169, 97, 0.15);
    color: var(--color-gold);
    &::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: var(--color-gold);
    }
  }
}

.ni-icon { font-size: 18px; }

.sb-bottom {
  padding: 12px 16px;
  border-top: 1px solid rgba(245, 239, 230, 0.1);
}

.sb-link {
  font-size: 12px;
  padding: 8px 0;
  cursor: pointer;
  opacity: 0.7;
  &:hover { opacity: 1; }
}

.main {
  flex: 1;
  margin-left: 220px;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #E5DFD3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.tb-title {
  font-family: var(--font-serif);
  font-size: 18px;
  letter-spacing: 0.1em;
  color: var(--color-ink);
}

.tb-info { display: flex; align-items: center; gap: 16px; }
.tb-time { font-size: 12px; color: var(--color-ink-3); }
.tb-user { display: flex; align-items: center; gap: 6px; font-size: 13px; }
.tb-avatar {
  width: 32px; height: 32px;
  background: var(--color-primary-50);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}

.content { flex: 1; padding: 20px; }
</style>
