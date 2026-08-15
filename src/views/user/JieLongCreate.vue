<template>
  <div class="page jl-create">
    <van-nav-bar
      title="发起接龙"
      left-arrow
      @click-left="$router.back()"
      :border="false"
    />

    <div class="form-card">
      <div class="form-title">— 填写接龙信息 —</div>

      <div class="form-item">
        <div class="fi-label">接龙标题</div>
        <input v-model="form.title" placeholder="如：春日宋锦发卡专场" class="fi-input" maxlength="30" />
        <div class="fi-tip">{{ form.title.length }}/30</div>
      </div>

      <div class="form-item">
        <div class="fi-label">选择商品</div>
        <div class="goods-pick" @click="showGoodsPicker = true">
          <img v-if="pickedGoods" :src="pickedGoods.cover" class="gp-img" />
          <div v-else class="gp-empty">点击选择商品</div>
          <div v-if="pickedGoods" class="gp-info">
            <div class="gp-name">{{ pickedGoods.name }}</div>
            <div class="gp-price">¥{{ pickedGoods.price }}</div>
          </div>
          <span class="gp-arrow">›</span>
        </div>
      </div>

      <div class="form-item">
        <div class="fi-label">接龙价格</div>
        <div class="price-input">
          <span class="pi-symbol">¥</span>
          <input v-model.number="form.price" type="number" placeholder="建议低于原价" class="pi-input" />
        </div>
        <div class="fi-tip">原价 ¥{{ pickedGoods?.originalPrice || pickedGoods?.price || 0 }}，建议比原价低 10-30%</div>
      </div>

      <div class="form-item">
        <div class="fi-label">目标件数</div>
        <van-stepper v-model="form.target" min="3" max="200" />
        <div class="fi-tip">达到目标件数即截单发货</div>
      </div>

      <div class="form-item">
        <div class="fi-label">截止时间</div>
        <div class="time-pick" @click="showTimePicker = true">
          {{ formatTime(form.deadline) }}
          <span class="tp-arrow">›</span>
        </div>
      </div>

      <div class="form-item">
        <div class="fi-label">接龙说明</div>
        <textarea v-model="form.desc" placeholder="选填：发货时间、规格说明等" class="fi-textarea" maxlength="200"></textarea>
      </div>
    </div>

    <div class="preview-card">
      <div class="pc-title">— 效果预览 —</div>
      <div class="preview">
        <img :src="pickedGoods?.cover || ''" class="pv-img" />
        <div class="pv-info">
          <div class="pv-title">{{ form.title || '接龙标题' }}</div>
          <div class="pv-init">由可可不加班发起</div>
          <div class="pv-price">¥{{ form.price || 0 }} <span class="pv-old">¥{{ pickedGoods?.originalPrice || 0 }}</span></div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="bb-cancel" @click="$router.back()">取消</div>
      <div class="bb-submit" @click="onSubmit">立即发起</div>
    </div>

    <!-- 商品选择弹层 -->
    <van-popup v-model:show="showGoodsPicker" position="bottom" round :style="{ height: '70%' }">
      <div class="picker">
        <div class="picker-title">选择商品</div>
        <div class="picker-list">
          <div
            v-for="g in goodsList"
            :key="g.id"
            :class="['picker-item', { active: form.goodsId === g.id }]"
            @click="pickGoods(g)"
          >
            <img :src="g.cover" class="pi-img" />
            <div class="pi-info">
              <div class="pi-name">{{ g.name }}</div>
              <div class="pi-price">¥{{ g.price }}</div>
            </div>
            <van-icon v-if="form.goodsId === g.id" name="success" class="pi-check" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { goodsList, findGoods } from '@/data/mock'

const router = useRouter()

const form = reactive({
  title: '春日宋锦发卡专场',
  goodsId: 1,
  price: 35,
  target: 30,
  deadline: Date.now() + 3600 * 1000 * 24,
  desc: ''
})

const showGoodsPicker = ref(false)
const showTimePicker = ref(false)
const pickedGoods = computed(() => form.goodsId ? findGoods(form.goodsId) : null)

function pickGoods(g) {
  form.goodsId = g.id
  form.price = Math.floor(g.price * 0.9)
  showGoodsPicker.value = false
}

function formatTime(t) {
  const d = new Date(t)
  return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')} 截止`
}

function onSubmit() {
  if (!form.title) return showToast('请填写接龙标题')
  if (!form.goodsId) return showToast('请选择商品')
  if (!form.price) return showToast('请填写价格')
  showLoadingToast({ message: '发布中...', forbidClick: true })
  setTimeout(() => {
    closeToast()
    showToast('接龙已发布，分享到群里吧')
    setTimeout(() => router.replace('/jielong/list'), 800)
  }, 1000)
}
</script>

<style lang="scss" scoped>
.jl-create {
  min-height: 100vh;
  background: var(--color-bg);
  padding-bottom: 80px;
}

:deep(.van-nav-bar) {
  background: var(--color-primary);
  .van-nav-bar__title, .van-nav-bar__text, .van-icon { color: #F5EFE6 !important; }
  .van-hairline--bottom::after { border: none; }
}

.form-card, .preview-card {
  margin: 12px;
  padding: 16px;
  background: var(--color-bg-2);
  border-radius: var(--radius-md);
}

.form-title, .pc-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 12px;
  color: var(--color-ink-3);
  letter-spacing: 0.3em;
  margin-bottom: 16px;
}

.form-item {
  padding: 12px 0;
  border-bottom: 1px dashed var(--color-bg-3);
  &:last-child { border-bottom: none; }
}

.fi-label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--color-ink-2);
}

.fi-input, .fi-textarea {
  width: 100%;
  border: none;
  outline: none;
  background: var(--color-bg);
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  color: var(--color-ink);
  &::placeholder { color: var(--color-ink-3); }
}

.fi-textarea {
  min-height: 60px;
  resize: none;
  font-family: inherit;
}

.fi-tip { font-size: 10px; color: var(--color-ink-3); margin-top: 4px; text-align: right; }

.goods-pick {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: var(--color-bg);
  border-radius: 6px;
}

.gp-img { width: 56px; height: 56px; border-radius: 4px; object-fit: cover; }

.gp-empty {
  flex: 1;
  text-align: center;
  color: var(--color-ink-3);
  font-size: 13px;
  padding: 16px 0;
}

.gp-info { flex: 1; }
.gp-name { font-size: 13px; font-weight: 500; }
.gp-price { color: var(--color-primary); font-size: 14px; font-weight: 600; margin-top: 2px; }

.gp-arrow, .tp-arrow { color: var(--color-ink-3); }

.price-input {
  display: flex;
  align-items: center;
  background: var(--color-bg);
  border-radius: 6px;
  padding: 10px;
}

.pi-symbol { color: var(--color-primary); font-size: 18px; margin-right: 4px; }
.pi-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
}

.time-pick {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-bg);
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
}

.preview {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: var(--color-bg);
  border-radius: 6px;
}

.pv-img { width: 80px; height: 80px; border-radius: 4px; object-fit: cover; }
.pv-info { flex: 1; }
.pv-title { font-size: 13px; font-weight: 500; line-height: 1.3; }
.pv-init { font-size: 10px; color: var(--color-ink-3); margin-top: 4px; }
.pv-price { color: var(--color-primary); font-size: 16px; font-weight: 700; margin-top: 6px; }
.pv-old { color: var(--color-ink-3); text-decoration: line-through; font-size: 11px; font-weight: 400; }

.bottom-bar {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  display: flex;
  background: var(--color-bg-2);
  border-top: 1px solid var(--color-bg-3);
  z-index: 10;
}

.bb-cancel, .bb-submit {
  flex: 1;
  height: 50px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.bb-cancel { color: var(--color-ink-2); }
.bb-submit {
  background: linear-gradient(135deg, #6B8E6B, #4A6B4A);
  color: #F5EFE6;
}

.picker {
  background: var(--color-bg-2);
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  border-radius: 16px 16px 0 0;
}

.picker-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 16px;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
}

.picker-list { display: flex; flex-direction: column; gap: 8px; }

.picker-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: var(--color-bg);
  border-radius: 6px;
  border: 1px solid transparent;
  &.active { border-color: var(--color-primary); background: var(--color-primary-50); }
}

.pi-img { width: 50px; height: 50px; border-radius: 4px; object-fit: cover; }
.pi-info { flex: 1; }
.pi-name { font-size: 13px; }
.pi-price { color: var(--color-primary); font-size: 13px; font-weight: 600; margin-top: 2px; }
.pi-check { color: var(--color-primary); }
</style>
