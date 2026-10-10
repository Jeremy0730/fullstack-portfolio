<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { permissionOptions, roles as seed, type RoleRow } from '@/mock/data'

const list = ref<RoleRow[]>(seed.map((role) => ({ ...role, permissions: [...role.permissions] })))
const visible = ref(false)
const currentId = ref<number | null>(null)
const form = reactive({
  name: '',
  description: '',
  permissions: [] as string[],
})

function open(row: RoleRow) {
  currentId.value = row.id
  form.name = row.name
  form.description = row.description
  form.permissions = [...row.permissions]
  visible.value = true
}

function save() {
  if (form.permissions.length === 0) {
    ElMessage.warning('至少保留一项权限')
    return
  }
  const target = list.value.find((role) => role.id === currentId.value)
  if (!target) return
  target.description = form.description
  target.permissions = [...form.permissions]
  visible.value = false
  ElMessage.success(`已更新「${target.name}」的权限`)
}
</script>

<template>
  <div>
    <div class="page-head">
      <div>
        <h1>角色权限</h1>
        <p>按岗位划分看板、订单和财务权限。演示里权限立即生效于当前页面。</p>
      </div>
    </div>
    <div class="stats" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))">
      <article v-for="role in list" :key="role.id" class="panel">
        <div style="display: flex; justify-content: space-between; gap: 8px">
          <div>
            <strong>{{ role.name }}</strong>
            <div style="color: var(--muted); font-size: 12px; margin-top: 4px">{{ role.code }} · {{ role.members }} 人</div>
          </div>
          <el-button link type="primary" @click="open(role)">配置</el-button>
        </div>
        <p style="color: var(--muted); font-size: 13px">{{ role.description }}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px">
          <el-tag v-for="item in role.permissions" :key="item" effect="plain">{{ item }}</el-tag>
        </div>
      </article>
    </div>

    <el-dialog v-model="visible" :title="`配置 ${form.name}`" width="520px">
      <el-input v-model="form.description" placeholder="角色说明" style="margin-bottom: 12px" />
      <el-checkbox-group v-model="form.permissions">
        <el-checkbox v-for="item in permissionOptions" :key="item" :value="item" style="width: 140px; margin-bottom: 8px">
          {{ item }}
        </el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>
