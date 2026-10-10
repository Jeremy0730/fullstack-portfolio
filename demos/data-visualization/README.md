# Northline 经营指挥中心

1920×1080 数据大屏演示。页面会按窗口等比缩放，数字每 3 秒做一次样例波动。

## 运行

```bash
cd demos/data-visualization
npm install
npm run dev
```

浏览器打开 http://localhost:5174。全屏时按 1920×1080 显示。

## 画面

- 今日 GMV、订单、客单价、在线门店、履约时效、异常单
- 14 日趋势、门店排行、渠道占比、目标仪表、最新订单、异常提醒

## 技术

React 18、TypeScript、Vite、ECharts

## 部署

构建产物在 `dist/`。Vercel 选择 Vite，输出目录 `dist`。
