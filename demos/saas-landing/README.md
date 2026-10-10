# Northline SaaS 落地页

Northline 的营销页，包含定价和预约表单。表单只在浏览器内确认，不发送邮件。

同一套示例还有：

- `demos/admin-dashboard` 管理后台
- `demos/data-visualization` 经营大屏
- `demos/mini-program` 点单小程序

## 运行

```bash
cd demos/saas-landing
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 页面

- 首屏和产品示意
- 功能、三步流程
- 月付 / 年付定价
- FAQ
- 预约演示弹窗（本地校验）

## 技术

Next.js 14、TypeScript、Tailwind CSS、Framer Motion

## 部署

Vercel 选择 Next.js，根目录指向 `demos/saas-landing`。
