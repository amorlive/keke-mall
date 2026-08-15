<template>
  <div class="page dist-team">
    <van-nav-bar title="我的团队" left-arrow @click-left="$router.back()" :border="false" />

    <div class="team-stats">
      <div class="ts-card">
        <div class="ts-num">12</div>
        <div class="ts-label">直接邀请</div>
      </div>
      <div class="ts-card">
        <div class="ts-num">28</div>
        <div class="ts-label">间接邀请</div>
      </div>
      <div class="ts-card">
        <div class="ts-num">40</div>
        <div class="ts-label">团队总人数</div>
      </div>
    </div>

    <div class="list-title">— 团队成员 —</div>
    <div class="list">
      <div v-for="(m, i) in members" :key="i" class="member">
        <div class="m-avatar">{{ m.avatar }}</div>
        <div class="m-info">
          <div class="m-name">{{ m.name }} <span class="m-level">{{ m.level }}</span></div>
          <div class="m-time">加入于 {{ m.time }}</div>
        </div>
        <div class="m-amt">贡献 ¥{{ m.amt }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const members = [
  { avatar: '🌸', name: '小米', level: '银卡', time: '2026-09-01', amt: '38.50' },
  { avatar: '🌺', name: 'Lisa', level: '金卡', time: '2026-08-25', amt: '128.00' },
  { avatar: '🌼', name: '阿月', level: '银卡', time: '2026-08-20', amt: '56.80' },
  { avatar: '💐', name: '糖糖', level: '银卡', time: '2026-08-15', amt: '22.40' },
  { avatar: '🌷', name: '珍珍', level: '金卡', time: '2026-08-10', amt: '88.00' },
  { avatar: '🌻', name: 'Nina', level: '银卡', time: '2026-08-05', amt: '46.20' }
]
</script>

<style lang="scss" scoped>
.dist-team { min-height: 100vh; background: var(--color-bg); padding-bottom: 40px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }

.team-stats { display: flex; gap: 8px; margin: 12px; }
.ts-card { flex: 1; text-align: center; padding: 14px; background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #F5EFE6; border-radius: var(--radius-md); }
.ts-num { font-size: 22px; font-weight: 700; font-family: var(--font-serif); }
.ts-label { font-size: 11px; opacity: 0.85; margin-top: 2px; }

.list-title { text-align: center; font-family: var(--font-serif); color: var(--color-ink-3); font-size: 12px; letter-spacing: 0.3em; margin: 16px 0 8px; }
.list { padding: 0 12px; }
.member { display: flex; align-items: center; background: var(--color-bg-2); border-radius: var(--radius-md); padding: 12px; margin-bottom: 8px; }
.m-avatar { width: 40px; height: 40px; background: var(--color-primary-50); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.m-info { flex: 1; margin-left: 10px; }
.m-name { font-size: 13px; font-weight: 500; }
.m-level { font-size: 10px; color: var(--color-primary); background: var(--color-primary-50); padding: 1px 5px; border-radius: 3px; margin-left: 4px; }
.m-time { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
.m-amt { color: var(--color-primary); font-size: 14px; font-weight: 600; }
</style>
