<template>
  <div class="admin-page">
    <div class="settings-card">
      <div class="sc-title">— 店铺基础信息 —</div>
      <div class="sc-row"><span class="scr-label">店铺名称</span><input v-model="form.name" class="scr-input" /></div>
      <div class="sc-row"><span class="scr-label">店铺 Logo</span>
        <div class="logo-pick">
          <div class="lp-preview">可</div>
          <button class="lp-btn">更换</button>
        </div>
      </div>
      <div class="sc-row"><span class="scr-label">店铺简介</span><textarea v-model="form.brief" class="scr-textarea" rows="2" /></div>
      <div class="sc-row"><span class="scr-label">联系电话</span><input v-model="form.phone" class="scr-input" /></div>
      <div class="sc-row"><span class="scr-label">客服微信号</span><input v-model="form.wechat" class="scr-input" /></div>
      <div class="sc-row"><span class="scr-label">客服时间</span><input v-model="form.serviceTime" class="scr-input" /></div>
    </div>

    <div class="settings-card">
      <div class="sc-title">— 支付与物流 —</div>
      <div class="sc-row"><span class="scr-label">微信支付</span><van-switch v-model="form.wxPay" active-color="var(--color-primary)" /></div>
      <div class="sc-row"><span class="scr-label">商户号</span><input v-model="form.mchId" class="scr-input" /></div>
      <div class="sc-row"><span class="scr-label">快递发货</span><van-switch v-model="form.express" active-color="var(--color-primary)" /></div>
      <div class="sc-row"><span class="scr-label">默认运费</span><input v-model.number="form.shipping" type="number" class="scr-input" /> <span class="unit">元</span></div>
      <div class="sc-row"><span class="scr-label">满额包邮</span><input v-model.number="form.freeShip" type="number" class="scr-input" /> <span class="unit">元（0 表示不包邮）</span></div>
      <div class="sc-row"><span class="scr-label">到店自提</span><van-switch v-model="form.pickup" active-color="var(--color-primary)" /></div>
      <div class="sc-row"><span class="scr-label">自提地址</span><input v-model="form.pickupAddr" class="scr-input" /></div>
    </div>

    <div class="settings-card">
      <div class="sc-title">— 营销与会员 —</div>
      <div class="sc-row"><span class="scr-label">分销功能</span><van-switch v-model="form.distribution" active-color="var(--color-primary)" /></div>
      <div class="sc-row"><span class="scr-label">分销佣金比例</span><input v-model.number="form.distRate" type="number" class="scr-input" /> <span class="unit">%</span></div>
      <div class="sc-row"><span class="scr-label">会员体系</span><van-switch v-model="form.member" active-color="var(--color-primary)" /></div>
      <div class="sc-row"><span class="scr-label">积分抵现比例</span><input v-model.number="form.pointRate" type="number" class="scr-input" /> <span class="unit">积分 = 1 元</span></div>
    </div>

    <div class="bottom-bar">
      <button class="bb-cancel">取消</button>
      <button class="bb-save" @click="onSave">保存设置</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { showToast } from 'vant'

const form = reactive({
  name: '可可手作',
  brief: '一寸宋锦 · 一寸心意',
  phone: '138-0000-0000',
  wechat: 'keke-handmade',
  serviceTime: '9:00 - 22:00',
  wxPay: true,
  mchId: '1688888888',
  express: true,
  shipping: 10,
  freeShip: 99,
  pickup: true,
  pickupAddr: '江苏省苏州市姑苏区平江路 88 号',
  distribution: true,
  distRate: 10,
  member: true,
  pointRate: 100
})

function onSave() { showToast('设置已保存') }
</script>

<style lang="scss" scoped>
.admin-page { display: flex; flex-direction: column; gap: 12px; }
.settings-card { background: #fff; border-radius: 8px; padding: 16px; }
.sc-title { font-size: 13px; font-weight: 600; color: var(--color-ink-2); margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #E5DFD3; }

.sc-row { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px dashed var(--color-bg-3); &:last-child { border-bottom: none; } }
.scr-label { width: 120px; font-size: 13px; color: var(--color-ink-2); }
.scr-input { flex: 1; padding: 8px 12px; border: 1px solid #E5DFD3; border-radius: 4px; font-size: 13px; outline: none; max-width: 400px; &:focus { border-color: var(--color-primary); } }
.scr-textarea { flex: 1; padding: 8px 12px; border: 1px solid #E5DFD3; border-radius: 4px; font-size: 13px; outline: none; font-family: inherit; resize: vertical; }
.unit { color: var(--color-ink-3); font-size: 12px; margin-left: 8px; }

.logo-pick { display: flex; align-items: center; gap: 12px; }
.lp-preview { width: 48px; height: 48px; background: var(--color-primary); color: #F5EFE6; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 24px; font-weight: 700; }
.lp-btn { padding: 4px 12px; border: 1px solid #E5DFD3; background: #fff; border-radius: 4px; font-size: 12px; cursor: pointer; }

.bottom-bar { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 0; }
.bb-cancel { padding: 8px 24px; border: 1px solid #E5DFD3; background: #fff; border-radius: 4px; cursor: pointer; }
.bb-save { padding: 8px 24px; background: var(--color-primary); color: #fff; border: none; border-radius: 4px; cursor: pointer; }
</style>
