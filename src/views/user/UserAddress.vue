<template>
  <div class="page user-address">
    <van-nav-bar title="收货地址" left-arrow @click-left="$router.back()" :border="false" />
    <div class="addr-list">
      <div v-for="a in addresses" :key="a.id" class="addr-card">
        <div class="ac-top">
          <div class="ac-info">
            <span class="ac-name">{{ a.name }}</span>
            <span class="ac-phone">{{ a.phone }}</span>
            <span v-if="a.isDefault" class="ac-tag">默认</span>
          </div>
        </div>
        <div class="ac-detail">{{ a.province }} {{ a.city }} {{ a.district }} {{ a.detail }}</div>
        <div class="ac-actions">
          <van-checkbox v-model="a.isDefault" checked-color="var(--color-primary)">设为默认</van-checkbox>
          <div class="ac-btns">
            <span @click="showToast('编辑')">编辑</span>
            <span @click="onDelete(a)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="add-btn" @click="showAdd = true">+ 新增收货地址</div>

    <van-popup v-model:show="showAdd" position="bottom" round :style="{ height: 'auto' }">
      <div class="add-popup">
        <div class="ap-title">新增地址</div>
        <div class="ap-row"><span>姓名</span><input v-model="form.name" placeholder="请输入" /></div>
        <div class="ap-row"><span>电话</span><input v-model="form.phone" type="tel" placeholder="请输入手机号" /></div>
        <div class="ap-row"><span>省市区</span><input v-model="form.region" placeholder="省/市/区" /></div>
        <div class="ap-row"><span>详细地址</span><input v-model="form.detail" placeholder="街道、楼牌号" /></div>
        <div class="ap-bottom">
          <div class="ap-cancel" @click="showAdd = false">取消</div>
          <div class="ap-save" @click="onSave">保存</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { showToast, showConfirmDialog } from 'vant'
import { addresses } from '@/data/mock'

const showAdd = ref(false)
const form = reactive({ name: '', phone: '', region: '', detail: '' })

function onDelete(a) {
  showConfirmDialog({ title: '删除地址', message: '确认删除？' })
    .then(() => showToast('已删除'))
    .catch(() => {})
}

function onSave() {
  if (!form.name || !form.phone) return showToast('请填写完整')
  showToast('保存成功')
  showAdd.value = false
}
</script>

<style lang="scss" scoped>
.user-address { min-height: 100vh; background: var(--color-bg); padding-bottom: 100px; }
:deep(.van-nav-bar) { background: var(--color-primary); .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; } .van-hairline--bottom::after { border: none; } }
.addr-list { padding: 12px; }
.addr-card { background: var(--color-bg-2); border-radius: var(--radius-md); padding: 14px; margin-bottom: 10px; border-left: 3px solid var(--color-primary); }
.ac-info { display: flex; align-items: center; gap: 10px; }
.ac-name { font-size: 14px; font-weight: 600; }
.ac-phone { font-size: 12px; color: var(--color-ink-2); }
.ac-tag { font-size: 10px; padding: 1px 5px; background: var(--color-primary); color: #F5EFE6; border-radius: 3px; }
.ac-detail { font-size: 12px; color: var(--color-ink-2); margin: 6px 0 10px; }
.ac-actions { display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px dashed var(--color-bg-3); }
.ac-btns { display: flex; gap: 16px; font-size: 12px; color: var(--color-primary); }

.add-btn { position: fixed; bottom: 0; left: 0; right: 0; background: var(--color-primary); color: #F5EFE6; text-align: center; padding: 14px; font-size: 14px; letter-spacing: 0.1em; }

.add-popup { padding: 16px; background: var(--color-bg-2); border-radius: 16px 16px 0 0; }
.ap-title { text-align: center; font-family: var(--font-serif); font-size: 16px; letter-spacing: 0.2em; margin-bottom: 12px; }
.ap-row { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--color-bg-3); font-size: 13px; span { width: 70px; color: var(--color-ink-2); } input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; } }
.ap-bottom { display: flex; margin-top: 16px; }
.ap-cancel, .ap-save { flex: 1; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.ap-cancel { color: var(--color-ink-2); }
.ap-save { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; border-radius: 22px; margin-left: 8px; }
</style>
