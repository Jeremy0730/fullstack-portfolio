<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import {
  Bell,
  Expand,
  Fold,
  Lock,
  Moon,
  Odometer,
  Sunny,
  SwitchButton,
  Tickets,
  User,
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const app = useAppStore()
const keyword = ref('')

const notices = ref([
  { id: 1, title: '上海前滩店有 3 笔超时订单', time: '10 分钟前', read: false },
  { id: 2, title: '新员工账号待分配角色', time: '1 小时前', read: false },
  { id: 3, title: '昨日报表已可导出', time: '今天 08:00', read: true },
])

const unread = computed(() => notices.value.filter((item) => !item.read).length)

function search() {
  const q = keyword.value.trim()
  router.push({ path: '/users', query: q ? { q } : {} })
}

function logout() {
  auth.logout()
  router.push('/login')
}

function markRead(id: number) {
  const item = notices.value.find((notice) => notice.id === id)
  if (item) item.read = true
}

watch(
  () => route.path,
  () => {
    if (window.matchMedia('(max-width: 960px)').matches) app.collapsed = true
  },
)
</script>

<template>
  <div class="layout">
    <button
      v-show="!app.collapsed"
      class="nav-backdrop"
      type="button"
      aria-label="关闭菜单"
      @click="app.collapsed = true"
    ></button>
    <aside class="sidebar" :class="{ 'is-collapsed': app.collapsed }">
      <div class="brand">
        <div class="brand-mark">N</div>
        <div v-show="!app.collapsed">
          <strong>Northline</strong>
          <span>多门店运营后台</span>
        </div>
      </div>
      <el-menu
        router
        :collapse="app.collapsed"
        :default-active="route.path"
        background-color="#0f172a"
        text-color="#cbd5e1"
        active-text-color="#93c5fd"
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <span>工作台</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/roles">
          <el-icon><Lock /></el-icon>
          <span>角色权限</span>
        </el-menu-item>
        <el-menu-item index="/orders">
          <el-icon><Tickets /></el-icon>
          <span>订单中心</span>
        </el-menu-item>
      </el-menu>
    </aside>

    <section class="main">
      <header class="header">
        <button class="icon-btn" type="button" aria-label="折叠侧栏" @click="app.toggleCollapse()">
          <el-icon :size="18">
            <Expand v-if="app.collapsed" />
            <Fold v-else />
          </el-icon>
        </button>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/dashboard' }">Northline</el-breadcrumb-item>
          <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-input
          v-model="keyword"
          class="header-search"
          placeholder="搜索用户姓名或邮箱"
          clearable
          @keyup.enter="search"
        />
        <div class="header-spacer"></div>
        <button class="icon-btn" type="button" aria-label="切换主题" @click="app.toggleDark()">
          <el-icon :size="18">
            <Sunny v-if="app.dark" />
            <Moon v-else />
          </el-icon>
        </button>
        <el-popover placement="bottom" :width="300" trigger="click">
          <template #reference>
            <el-badge :value="unread" :hidden="unread === 0">
              <button class="icon-btn" type="button" aria-label="通知">
                <el-icon :size="18"><Bell /></el-icon>
              </button>
            </el-badge>
          </template>
          <div class="notice">
            <strong>通知</strong>
            <div v-for="item in notices" :key="item.id" class="notice-item">
              <div>{{ item.title }}</div>
              <small>{{ item.time }}</small>
              <div>
                <el-button v-if="!item.read" link type="primary" @click="markRead(item.id)">标为已读</el-button>
              </div>
            </div>
          </div>
        </el-popover>
        <el-dropdown>
          <span class="user-trigger">
            <el-avatar :size="32">{{ auth.name.slice(0, 1) }}</el-avatar>
            <span>{{ auth.name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </header>
      <main class="content">
        <router-view />
      </main>
    </section>
  </div>
</template>
