<template>
  <div class="page login">
    <div class="brand-area">
      <div class="ba-mark">可</div>
      <div class="ba-name">可可手作</div>
      <div class="ba-slogan">一寸宋锦 · 一寸心意</div>
    </div>

    <div class="login-card">
      <van-tabs v-model:active="tab" color="var(--color-primary)" line-width="20px">
        <van-tab title="手机登录" name="phone" />
        <van-tab title="微信登录" name="wechat" />
      </van-tabs>

      <div v-if="tab === 'phone'" class="form-area">
        <div class="form-row">
          <span class="fr-label">手机号</span>
          <input v-model="phone" type="tel" placeholder="请输入手机号" class="fr-input" maxlength="11" />
        </div>
        <div class="form-row">
          <span class="fr-label">验证码</span>
          <input v-model="code" type="tel" placeholder="请输入验证码" class="fr-input" maxlength="6" />
          <span class="fr-code" @click="onCode">{{ codeText }}</span>
        </div>
        <div class="login-btn" @click="onLogin">登 录</div>
        <div class="agreement">
          <van-checkbox v-model="agreed" checked-color="var(--color-primary)" shape="square" />
          <span>我已阅读并同意 <span class="hl">《用户协议》</span> <span class="hl">《隐私政策》</span></span>
        </div>
      </div>

      <div v-else class="wechat-area">
        <div class="wechat-icon">💬</div>
        <div class="wechat-btn" @click="onLogin">微信一键登录</div>
      </div>

      <div class="alt-link" @click="onLogin">先看看 →</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const tab = ref('phone')
const phone = ref('')
const code = ref('')
const agreed = ref(true)
const codeText = ref('获取验证码')
const counting = ref(false)

function onCode() {
  if (counting.value) return
  if (!/^1\d{10}$/.test(phone.value)) return showToast('请输入正确的手机号')
  showToast('验证码已发送（演示：123456）')
  counting.value = true
  let s = 60
  codeText.value = `${s}s 后重发`
  const t = setInterval(() => {
    s--
    if (s <= 0) { clearInterval(t); counting.value = false; codeText.value = '获取验证码' }
    else codeText.value = `${s}s 后重发`
  }, 1000)
}

function onLogin() {
  showToast('登录成功（演示）')
  setTimeout(() => router.replace('/'), 600)
}
</script>

<style lang="scss" scoped>
.login { min-height: 100vh; background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 30%, var(--color-bg) 100%); padding: 60px 20px 40px; }

.brand-area { text-align: center; color: #F5EFE6; margin-bottom: 30px; }
.ba-mark { width: 60px; height: 60px; background: var(--color-gold); color: var(--color-primary-dark); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-family: var(--font-serif); font-size: 32px; font-weight: 700; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2); }
.ba-name { font-family: var(--font-serif); font-size: 24px; letter-spacing: 0.3em; margin-top: 12px; }
.ba-slogan { font-size: 12px; opacity: 0.85; letter-spacing: 0.15em; margin-top: 6px; }

.login-card { background: var(--color-bg-2); border-radius: var(--radius-lg); padding: 20px 16px; box-shadow: var(--shadow-lg); }

:deep(.van-tabs__nav--card) { background: var(--color-bg-3); }

.form-area { padding-top: 8px; }
.form-row { display: flex; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--color-bg-3); font-size: 14px; }
.fr-label { width: 60px; color: var(--color-ink-2); }
.fr-input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; }
.fr-code { color: var(--color-primary); font-size: 13px; padding-left: 8px; }

.login-btn { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light)); color: #F5EFE6; text-align: center; padding: 14px; border-radius: 24px; font-size: 15px; letter-spacing: 0.2em; margin-top: 20px; }
.agreement { display: flex; align-items: center; gap: 6px; margin-top: 14px; font-size: 11px; color: var(--color-ink-3); .hl { color: var(--color-primary); } }

.wechat-area { text-align: center; padding: 30px 0; }
.wechat-icon { font-size: 64px; }
.wechat-btn { background: #07C160; color: #fff; padding: 12px; border-radius: 24px; margin-top: 20px; font-size: 14px; }

.alt-link { text-align: center; margin-top: 20px; font-size: 12px; color: var(--color-ink-3); }
</style>
