<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)
const form = reactive({ username: '', password: '' })

const rules: FormRules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

function fillDemo() {
  form.username = 'admin'
  form.password = 'admin123'
}

async function submit() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  loading.value = true
  window.setTimeout(() => {
    loading.value = false
    if (!auth.login(form.username, form.password)) {
      ElMessage.error('账号或密码不正确')
      return
    }
    ElMessage.success('已进入演示后台')
    router.push('/dashboard')
  }, 350)
}
</script>

<template>
  <div class="login-page">
    <section class="login-hero">
      <div>
        <div class="brand-mark">N</div>
        <h1>多门店经营，<br />一块后台看清。</h1>
        <p>Northline 运营后台演示：用户与角色、订单处理和经营看板。数据为作品集样例，不会连接真实门店。</p>
        <ul class="login-points">
          <li>工作台汇总营收、订单和渠道占比</li>
          <li>用户、角色权限可在浏览器内增删改</li>
          <li>订单可筛选、查看明细并导出 CSV</li>
        </ul>
      </div>
      <small>Portfolio demo · Vue 3 + Element Plus</small>
    </section>
    <section class="login-panel">
      <div class="login-card">
        <h2>登录 Northline</h2>
        <p class="hint">使用演示账号即可浏览全部页面。</p>
        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="submit">
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" autocomplete="username" placeholder="admin" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password autocomplete="current-password" placeholder="admin123" @keyup.enter="submit" />
          </el-form-item>
          <div class="demo-fill">
            <span>admin / admin123</span>
            <el-button link type="primary" @click="fillDemo">填入演示账号</el-button>
          </div>
          <el-button type="primary" style="width: 100%" :loading="loading" @click="submit">进入后台</el-button>
        </el-form>
      </div>
    </section>
  </div>
</template>
