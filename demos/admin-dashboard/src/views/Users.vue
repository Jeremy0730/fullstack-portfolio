<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { departments, roleNames, users as seed, type UserRow, type UserStatus } from '@/mock/data'
import { downloadCsv } from '@/utils/csv'

const route = useRoute()
const list = ref<UserRow[]>(seed.map((item) => ({ ...item })))
const keyword = ref(typeof route.query.q === 'string' ? route.query.q : '')
const role = ref('')
const status = ref<UserStatus | ''>('')
const page = ref(1)
const pageSize = 8
const visible = ref(false)
const editingId = ref<number | null>(null)
const formRef = ref<FormInstance>()

const form = reactive({
  name: '',
  email: '',
  role: '区域运营',
  department: '华东区',
  status: 'active' as UserStatus,
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}

const filtered = computed(() =>
  list.value.filter((user) => {
    const q = keyword.value.trim()
    const hit = !q || user.name.includes(q) || user.email.includes(q)
    const roleHit = !role.value || user.role === role.value
    const statusHit = !status.value || user.status === status.value
    return hit && roleHit && statusHit
  }),
)

const paged = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch([keyword, role, status], () => {
  page.value = 1
})

watch(
  () => route.query.q,
  (value) => {
    keyword.value = typeof value === 'string' ? value : ''
  },
)

function resetForm() {
  form.name = ''
  form.email = ''
  form.role = '区域运营'
  form.department = '华东区'
  form.status = 'active'
}

function openCreate() {
  editingId.value = null
  resetForm()
  visible.value = true
}

function openEdit(row: UserRow) {
  editingId.value = row.id
  form.name = row.name
  form.email = row.email
  form.role = row.role
  form.department = row.department
  form.status = row.status
  visible.value = true
}

async function save() {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  if (editingId.value == null) {
    const nextId = Math.max(...list.value.map((user) => user.id)) + 1
    list.value.unshift({
      id: nextId,
      name: form.name,
      email: form.email,
      role: form.role,
      department: form.department,
      status: form.status,
      lastLogin: '尚未登录',
    })
    ElMessage.success('已添加用户（仅保存在本次浏览）')
  } else {
    const target = list.value.find((user) => user.id === editingId.value)
    if (target) Object.assign(target, form)
    ElMessage.success('已更新用户')
  }
  visible.value = false
}

async function remove(row: UserRow) {
  await ElMessageBox.confirm(`删除 ${row.name} 的账号？此操作只影响当前页面。`, '删除用户', { type: 'warning' })
  list.value = list.value.filter((user) => user.id !== row.id)
  ElMessage.success('已删除')
}

function exportUsers() {
  downloadCsv('northline-users.csv', [
    ['姓名', '邮箱', '角色', '区域', '状态', '最近登录'],
    ...filtered.value.map((user) => [
      user.name,
      user.email,
      user.role,
      user.department,
      user.status === 'active' ? '启用' : '停用',
      user.lastLogin,
    ]),
  ])
}
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>用户管理</h1>
        <p>门店和总部账号。改动保存在浏览器内存里，刷新后恢复样例。</p>
      </div>
      <div style="display: flex; gap: 8px">
        <el-button @click="exportUsers">导出 CSV</el-button>
        <el-button type="primary" @click="openCreate">新增用户</el-button>
      </div>
    </div>
    <section class="panel">
      <div class="toolbar">
        <el-input v-model="keyword" placeholder="姓名或邮箱" clearable style="width: 220px" />
        <el-select v-model="role" placeholder="全部角色" clearable style="width: 160px">
          <el-option v-for="item in roleNames" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="status" placeholder="全部状态" clearable style="width: 140px">
          <el-option label="启用" value="active" />
          <el-option label="停用" value="disabled" />
        </el-select>
      </div>
      <el-table :data="paged" empty-text="没有匹配的用户">
        <el-table-column prop="name" label="姓名" width="110" />
        <el-table-column prop="email" label="邮箱" min-width="220" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="department" label="区域" width="110" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status === 'active'"
              @change="(value: string | number | boolean) => (row.status = value ? 'active' : 'disabled')"
            />
          </template>
        </el-table-column>
        <el-table-column prop="lastLogin" label="最近登录" width="160" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="remove(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 12px">
        <el-pagination
          v-model:current-page="page"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="filtered.length"
        />
      </div>
    </section>

    <el-dialog v-model="visible" :title="editingId ? '编辑用户' : '新增用户'" width="480px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="72px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" style="width: 100%">
            <el-option v-for="item in roleNames" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="form.department" style="width: 100%">
            <el-option v-for="item in departments" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio value="active">启用</el-radio>
            <el-radio value="disabled">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
