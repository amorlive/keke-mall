<template>
  <div class="page user">
    <!-- 顶部用户卡 -->
    <div class="user-header">
      <div class="user-row">
        <div class="avatar">{{ user.avatar }}</div>
        <div class="user-info">
          <div class="user-name">
            {{ user.nickname }}
            <span class="vip-tag">{{ user.level }}</span>
          </div>
          <div class="user-id">邀请码：{{ user.inviteCode }}</div>
        </div>
        <div class="user-action" @click="$router.push('/user/settings')">
          <van-icon name="setting-o" size="20" />
        </div>
      </div>

      <div class="user-stats">
        <div class="stat">
          <div class="stat-num">{{ user.points }}</div>
          <div class="stat-label">积分</div>
        </div>
        <div class="stat">
          <div class="stat-num">{{ user.couponCount }}</div>
          <div class="stat-label">优惠券</div>
        </div>
        <div class="stat">
          <div class="stat-num">{{ user.favoriteCount }}</div>
          <div class="stat-label">收藏</div>
        </div>
        <div class="stat">
          <div class="stat-num">{{ user.orderCount }}</div>
          <div class="stat-label">订单</div>
        </div>
      </div>
    </div>

    <!-- 订单入口 -->
    <div class="order-card">
      <div class="oc-header">
        <div class="oc-title">我的订单</div>
        <div class="oc-more" @click="$router.push('/user/orders')">全部订单 ›</div>
      </div>
      <div class="oc-grid">
        <div class="oc-item" @click="$router.push('/user/orders?status=待付款')">
          <van-icon name="balance-pay" size="22" />
          <div class="oc-label">待付款</div>
        </div>
        <div class="oc-item" @click="$router.push('/user/orders?status=待发货')">
          <van-icon name="gift-card-o" size="22" />
          <div class="oc-label">待发货</div>
        </div>
        <div class="oc-item" @click="$router.push('/user/orders?status=待收货')">
          <van-icon name="logistics" size="22" />
          <div class="oc-label">待收货</div>
        </div>
        <div class="oc-item" @click="$router.push('/user/orders?status=已完成')">
          <van-icon name="comment-o" size="22" />
          <div class="oc-label">待评价</div>
        </div>
        <div class="oc-item" @click="$router.push('/user/orders')">
          <van-icon name="after-sale" size="22" />
          <div class="oc-label">售后</div>
        </div>
      </div>
    </div>

    <!-- 营销功能 -->
    <div class="feature-card">
      <div class="fc-title">— 我的营销 —</div>
      <div class="fc-grid">
        <div class="fc-item" @click="$router.push('/user/group')">
          <div class="fc-icon" style="background: var(--color-primary-50);">👯</div>
          <div class="fc-name">我的拼团</div>
        </div>
        <div class="fc-item" @click="$router.push('/user/jielong')">
          <div class="fc-icon" style="background: #E8F0E8;">🐉</div>
          <div class="fc-name">我的接龙</div>
        </div>
        <div class="fc-item" @click="$router.push('/user/favorite')">
          <div class="fc-icon" style="background: #F5E6E0;">❤️</div>
          <div class="fc-name">我的收藏</div>
        </div>
        <div class="fc-item" @click="$router.push('/user/coupon')">
          <div class="fc-icon" style="background: #F0E6D5;">🎟️</div>
          <div class="fc-name">优惠券</div>
        </div>
      </div>
    </div>

    <!-- 会员 / 分销 -->
    <div class="vip-card" @click="$router.push('/user/vip')">
      <div class="vip-left">
        <div class="vip-crown">👑</div>
        <div class="vip-info">
          <div class="vip-title">银卡会员 · 享 9.5 折</div>
          <div class="vip-sub">升级金卡 享 9 折 + 包邮</div>
        </div>
      </div>
      <div class="vip-go">立即升级 ›</div>
    </div>

    <div class="dist-card" v-if="user.isDistributor" @click="$router.push('/user/distribution')">
      <div class="dist-icon">💰</div>
      <div class="dist-info">
        <div class="dist-title">分销中心</div>
        <div class="dist-sub">分享赚钱 · 累计佣金 ¥286</div>
      </div>
      <div class="dist-go">›</div>
    </div>

    <!-- 工具列表 -->
    <div class="tool-card">
      <div class="tc-row" @click="$router.push('/user/address')">
        <van-icon name="location-o" />
        <span>收货地址</span>
        <span class="arrow">›</span>
      </div>
      <div class="tc-row" @click="$router.push('/user/points')">
        <van-icon name="star-o" />
        <span>积分明细</span>
        <span class="arrow">›</span>
      </div>
      <div class="tc-row" @click="$router.push('/user/coupon')">
        <van-icon name="coupon-o" />
        <span>我的优惠券</span>
        <span class="tc-tag">3 张可用</span>
        <span class="arrow">›</span>
      </div>
      <div class="tc-row">
        <van-icon name="service-o" />
        <span>在线客服</span>
        <span class="tc-sub">9:00 - 22:00</span>
        <span class="arrow">›</span>
      </div>
      <div class="tc-row">
        <van-icon name="question-o" />
        <span>帮助中心</span>
        <span class="arrow">›</span>
      </div>
    </div>

    <div class="logout" @click="onLogout">退出登录</div>
  </div>
</template>

<script setup>
import { showConfirmDialog, showToast } from 'vant'
import { currentUser } from '@/data/mock'

const user = currentUser

function onLogout() {
  showConfirmDialog({ title: '退出登录', message: '确认退出当前账号？' })
    .then(() => showToast('已退出'))
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.user {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 80px;
}

.user-header {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #F5EFE6;
  padding: 24px 16px;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 20%, rgba(201, 169, 97, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.06) 0%, transparent 40%);
    pointer-events: none;
  }
}

.user-row {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.avatar {
  width: 56px; height: 56px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px;
  border: 2px solid var(--color-gold);
}

.user-info { flex: 1; }
.user-name {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.vip-tag {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--color-gold);
  color: var(--color-primary-dark);
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.user-id { font-size: 11px; opacity: 0.8; margin-top: 2px; }
.user-action { padding: 6px; }

.user-stats {
  display: flex;
  margin-top: 16px;
  position: relative;
  z-index: 1;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat-num {
  font-size: 18px;
  font-weight: 700;
  font-family: var(--font-serif);
}

.stat-label { font-size: 11px; opacity: 0.8; margin-top: 2px; }

.order-card {
  margin: -20px 12px 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-lg);
  padding: 16px;
  position: relative;
  z-index: 2;
  box-shadow: var(--shadow-md);
}

.oc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.oc-title { font-size: 14px; font-weight: 600; }
.oc-more { font-size: 11px; color: var(--color-ink-3); }

.oc-grid {
  display: flex;
  justify-content: space-around;
}

.oc-item {
  display: flex; flex-direction: column; align-items: center;
  gap: 4px;
  padding: 4px 8px;
  text-align: center;
  .van-icon { color: var(--color-primary); }
}

.oc-label { font-size: 11px; color: var(--color-ink-2); }

.feature-card {
  margin: 0 12px 12px;
  padding: 16px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.fc-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--color-ink-3);
  letter-spacing: 0.2em;
  margin-bottom: 12px;
}

.fc-grid { display: flex; justify-content: space-around; }
.fc-item { text-align: center; }
.fc-icon {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  margin: 0 auto 4px;
}
.fc-name { font-size: 11px; color: var(--color-ink-2); }

.vip-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 12px 12px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #C9A961, #A88845);
  color: #2B2118;
  border-radius: var(--radius-md);
}

.vip-left { display: flex; align-items: center; gap: 10px; }
.vip-crown { font-size: 28px; }
.vip-title { font-size: 14px; font-weight: 600; }
.vip-sub { font-size: 11px; opacity: 0.8; margin-top: 2px; }
.vip-go {
  font-size: 12px;
  padding: 4px 10px;
  background: rgba(43, 33, 24, 0.15);
  border-radius: 12px;
  color: #2B2118;
}

.dist-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 12px 12px;
  padding: 14px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.dist-icon {
  width: 44px; height: 44px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
}

.dist-info { flex: 1; }
.dist-title { font-size: 14px; font-weight: 600; }
.dist-sub { font-size: 11px; color: var(--color-ink-3); margin-top: 2px; }
.dist-go { color: var(--color-ink-3); font-size: 20px; }

.tool-card {
  margin: 0 12px 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.tc-row {
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-bg-3);
  font-size: 14px;
  color: var(--color-ink);
  &:last-child { border-bottom: none; }
  .van-icon { color: var(--color-primary); margin-right: 10px; font-size: 18px; }
  span:nth-of-type(1) { flex: 1; }
  .tc-sub { color: var(--color-ink-3); font-size: 11px; margin-right: 8px; }
  .tc-tag {
    background: var(--color-primary);
    color: #F5EFE6;
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 8px;
    margin-right: 6px;
  }
  .arrow { color: var(--color-ink-3); font-size: 18px; }
}

.logout {
  margin: 24px 12px 0;
  text-align: center;
  padding: 14px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
  color: var(--color-ink-2);
  font-size: 14px;
}
</style>
