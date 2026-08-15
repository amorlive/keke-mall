<template>
  <div class="page group-detail" v-if="group">
    <van-nav-bar
      title="拼团详情"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <div class="countdown-card">
      <div class="cd-row">
        <div class="cd-text">
          <div class="cd-title">还差 <span class="hl">{{ group.peopleNeeded - group.joined }}</span> 人成团</div>
          <div class="cd-sub">剩余 {{ timeLeft(group.expireAt) }} 自动结束</div>
        </div>
        <div class="cd-icon">⏰</div>
      </div>
      <div class="cd-rule">邀请好友一起拼，立享团购价</div>
    </div>

    <!-- 商品 -->
    <div class="goods">
      <img :src="goods?.cover" class="g-cover" />
      <div class="g-info">
        <div class="g-name">{{ goods?.name }}</div>
        <div class="g-prices">
          <div class="g-price">¥{{ group.price }} <span class="g-old">¥{{ group.originalPrice }}</span></div>
        </div>
        <div class="g-spec">规格：朱砂红 / 中号 8cm</div>
      </div>
    </div>

    <!-- 已参与成员 -->
    <div class="members">
      <div class="m-title">— 已 {{ group.joined }} 人参与 —</div>
      <div class="m-list">
        <div v-for="i in group.joined" :key="i" class="m-item">
          <div class="m-avatar">{{ ['🌸', '🌺', '🌼', '💐', '🌷'][i - 1] }}</div>
          <div class="m-name">团友{{ i }}</div>
        </div>
        <div v-for="i in (group.peopleNeeded - group.joined)" :key="'empty' + i" class="m-item empty">
          <div class="m-avatar">?</div>
          <div class="m-name">待加入</div>
        </div>
      </div>
    </div>

    <!-- 分享区 -->
    <div class="share-area">
      <div class="sa-title">📲 邀请好友参团</div>
      <div class="sa-btns">
        <div class="sa-btn" @click="showShare = true">
          <div class="sa-icon" style="background: #1AAD19;">💬</div>
          <div class="sa-name">微信好友</div>
        </div>
        <div class="sa-btn" @click="showShare = true">
          <div class="sa-icon" style="background: #07C160;">👥</div>
          <div class="sa-name">朋友圈</div>
        </div>
        <div class="sa-btn" @click="showShare = true">
          <div class="sa-icon" style="background: #C9A961;">📋</div>
          <div class="sa-name">复制链接</div>
        </div>
        <div class="sa-btn" @click="showPoster = true">
          <div class="sa-icon" style="background: #7A2E2A;">🖼️</div>
          <div class="sa-name">生成海报</div>
        </div>
      </div>
    </div>

    <!-- 规则 -->
    <div class="rule-block">
      <div class="rb-title">— 拼团规则 —</div>
      <div class="rb-item">1. 拼团有效期 24 小时，到期未成团自动退款</div>
      <div class="rb-item">2. 团长开团后，邀请好友扫码或链接参团</div>
      <div class="rb-item">3. 达到成团人数后，订单自动提交，商家发货</div>
      <div class="rb-item">4. 拼团商品不支持单独退款</div>
    </div>

    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <div class="bb-side">
        <div class="bb-icon" @click="$router.push('/group/list')">
          <van-icon name="share-o" size="20" />
          <span>更多拼团</span>
        </div>
        <div class="bb-icon" @click="showToast('客服：keke-handmade')">
          <van-icon name="service-o" size="20" />
          <span>客服</span>
        </div>
      </div>
      <div class="bb-btn" @click="onJoin">参与拼团 ¥{{ group.price }}</div>
    </div>

    <!-- 分享弹层 -->
    <van-share-sheet
      v-model:show="showShare"
      title="分享给好友"
      :options="shareOptions"
      @select="onShareSelect"
    />

    <!-- 海报弹层 -->
    <van-popup v-model:show="showPoster" :style="{ width: '80%', borderRadius: '12px' }">
      <div class="poster">
        <div class="p-top">
          <div class="p-logo">可</div>
          <div class="p-brand">可可手作</div>
        </div>
        <img :src="goods?.cover" class="p-img" />
        <div class="p-name">{{ goods?.name }}</div>
        <div class="p-price">¥{{ group.price }} <span class="p-old">¥{{ group.originalPrice }}</span></div>
        <div class="p-tag">扫码立享拼团价</div>
        <div class="p-qr">📱</div>
        <div class="p-bottom">长按识别二维码 · 一起拼</div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'
import { groupList, findGoods } from '@/data/mock'
import { timeLeft } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const showShare = ref(false)
const showPoster = ref(false)

const group = computed(() => groupList.find(g => g.id === route.params.id))
const goods = computed(() => group.value ? findGoods(group.value.goodsId) : null)

const shareOptions = [
  { name: '微信', icon: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments' },
  { name: '复制链接', icon: 'link-o' },
  { name: '保存图片', icon: 'photograph' }
]

function onShareSelect(opt) {
  showToast(`已${opt.name === '复制链接' ? '复制' : '发送'}到${opt.name}`)
  showShare.value = false
}

function onJoin() {
  showToast('已加入拼团！')
  setTimeout(() => router.push({ path: '/checkout', query: { from: 'group', groupId: group.value.id } }), 600)
}
</script>

<style lang="scss" scoped>
.group-detail {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 80px;
}

:deep(.van-nav-bar) {
  background: var(--color-primary);
  .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; }
  .van-hairline--bottom::after { border: none; }
}

.countdown-card {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #F5EFE6;
  margin: 12px;
  padding: 16px;
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  &::after {
    content: '👯';
    position: absolute;
    right: 10px; bottom: -20px;
    font-size: 100px;
    opacity: 0.15;
  }
}

.cd-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.cd-title {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.05em;
  .hl { color: var(--color-gold-light); font-size: 26px; }
}

.cd-sub { font-size: 11px; opacity: 0.85; margin-top: 4px; }
.cd-icon { font-size: 36px; }
.cd-rule { font-size: 11px; opacity: 0.8; margin-top: 8px; position: relative; z-index: 1; }

.goods {
  display: flex;
  gap: 12px;
  margin: 0 12px 12px;
  padding: 10px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.g-cover { width: 90px; height: 90px; border-radius: 6px; object-fit: cover; }
.g-info { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.g-name { font-size: 14px; font-weight: 500; line-height: 1.3; }
.g-price { color: var(--color-primary); font-size: 18px; font-weight: 700; }
.g-old { color: var(--color-ink-3); text-decoration: line-through; font-size: 11px; font-weight: 400; margin-left: 4px; }
.g-spec { font-size: 11px; color: var(--color-ink-3); }

.members {
  margin: 0 12px 12px;
  padding: 12px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.m-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--color-ink-3);
  letter-spacing: 0.2em;
  margin-bottom: 10px;
}

.m-list {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.m-item {
  text-align: center;
  .m-avatar {
    width: 40px; height: 40px;
    background: var(--color-primary-50);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    border: 1px dashed var(--color-primary);
  }
  .m-name { font-size: 10px; color: var(--color-ink-3); margin-top: 2px; }
  &.empty .m-avatar {
    background: var(--color-bg-3);
    border-color: var(--color-ink-4);
    color: var(--color-ink-3);
  }
}

.share-area {
  margin: 0 12px 12px;
  padding: 14px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.sa-title {
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 12px;
}

.sa-btns { display: flex; justify-content: space-around; }
.sa-btn { text-align: center; }
.sa-icon {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px;
  margin: 0 auto 4px;
  color: #fff;
}
.sa-name { font-size: 11px; color: var(--color-ink-2); }

.rule-block {
  margin: 0 12px 12px;
  padding: 14px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.rb-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--color-ink-3);
  letter-spacing: 0.3em;
  margin-bottom: 10px;
}

.rb-item { font-size: 11px; color: var(--color-ink-2); padding: 3px 0; }

.bottom-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  display: flex;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-bg-3);
  z-index: 10;
}

.bb-side { display: flex; }
.bb-icon {
  width: 56px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  font-size: 10px;
  color: var(--color-ink-2);
  padding: 6px 0;
  .van-icon { margin-bottom: 2px; }
}

.bb-btn {
  flex: 1;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: #F5EFE6;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.poster {
  background: var(--color-bg-2);
  padding: 16px;
  text-align: center;
}

.p-top { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; }
.p-logo { width: 32px; height: 32px; background: var(--color-primary); color: #F5EFE6; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 18px; font-weight: 700; }
.p-brand { font-family: var(--font-serif); font-size: 18px; font-weight: 600; color: var(--color-ink); }

.p-img { width: 100%; aspect-ratio: 1; border-radius: 8px; object-fit: cover; }

.p-name { font-size: 14px; font-weight: 500; margin-top: 10px; line-height: 1.3; }
.p-price { color: var(--color-primary); font-size: 20px; font-weight: 700; margin-top: 6px; }
.p-old { color: var(--color-ink-3); text-decoration: line-through; font-size: 12px; font-weight: 400; }
.p-tag { font-size: 11px; color: var(--color-primary); margin-top: 4px; }
.p-qr {
  width: 100px; height: 100px;
  background: var(--color-bg-3);
  border: 4px solid var(--color-primary);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 50px;
  margin: 12px auto 6px;
}
.p-bottom { font-size: 11px; color: var(--color-ink-3); }
</style>
