# Northline 运营后台

作品集演示：多门店零售的管理后台。数据写在前端，刷新页面会恢复初始样例。

## 运行

```bash
cd demos/admin-dashboard
npm install
npm run dev
```

浏览器打开 http://localhost:5173

演示账号：`admin` / `admin123`

## 功能

- 工作台：营收、渠道、品类图，以及最新订单
- 用户管理：搜索、筛选、新增、编辑、停用、删除、导出 CSV
- 角色权限：勾选岗位权限
- 订单中心：按状态筛选，打开明细，导出 CSV
- 顶栏：深色模式、通知、搜索用户

## 技术

Vue 3、TypeScript、Vite、Element Plus、Pinia、Vue Router、ECharts

## 部署

构建产物在 `dist/`。Vercel 选择 Vite，输出目录 `dist`。本目录已带 SPA 回退配置。
