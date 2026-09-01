# 📖 心情日记 (Mood Diary)
## Capture every fleeting mood.

一款纯前端的本地心情日记应用。用 Emoji 记录每一天的心情与天气，通过日历回顾、列表检索、数据统计，帮你更好地认识自己的情绪轨迹。

所有数据均存储在浏览器 `localStorage` 中，无需后端、无需登录，数据完全留在你自己的设备上。

## ✨ 功能特性

- **✏️ 写日记** — 记录日期、心情（5 档）、天气（6 种）、标签、正文，支持最多上传 3 张图片（单张 ≤ 500KB，以 Base64 存储）
- **📅 日历视图** — 按月浏览，每篇日记用对应的心情 Emoji 标记，快速定位任意一天
- **📋 日记列表** — 按正文搜索、按心情/标签筛选，支持标签管理与 JSON / TXT 导出，点击卡片查看详情
- **📊 统计分析** — 总日记数、平均心情、标签使用数；心情趋势折线图（近 7 / 30 天）、心情分布饼图、标签使用频率柱状图
- **🌙 明暗主题** — 一键切换，自动跟随系统偏好
- **🔒 本地存储** — 数据仅存于 `localStorage`，隐私安全

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18
- npm / pnpm / yarn 任选其一

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建产物
npm run preview

# 代码检查
npm run lint
```

## 🛠️ 技术栈

| 类别 | 技术 |
| --- | --- |
| 前端框架 | [React 19](https://react.dev/) |
| 语言 | [TypeScript](https://www.typescriptlang.org/) |
| 构建工具 | [Vite 8](https://vite.dev/) |
| 图表 | [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) |
| 日期处理 | [date-fns](https://date-fns.org/) |
| 代码规范 | [ESLint](https://eslint.org/) |

## 📁 项目结构

```
mood-diary/
├── public/
│   └── favicon.svg          # 站点图标
├── src/
│   ├── components/
│   │   ├── Layout/          # 整体布局与顶部导航
│   │   ├── DiaryEditor/     # 写/编辑日记
│   │   ├── CalendarView/    # 日历视图
│   │   ├── DiaryList/       # 日记列表与详情
│   │   └── Statistics/      # 统计分析
│   ├── hooks/
│   │   ├── useDiary.ts      # 日记数据状态管理
│   │   └── useTheme.ts      # 主题切换
│   ├── types/
│   │   └── diary.ts         # 类型定义
│   ├── constants/
│   │   └── index.ts         # 常量（心情/天气选项、存储 key 等）
│   ├── utils/
│   │   ├── date.ts          # 日期工具
│   │   ├── storage.ts       # localStorage 读写
│   │   └── export.ts        # 数据导出
│   ├── App.tsx              # 应用入口与页面路由
│   ├── main.tsx             # React 挂载入口
│   └── index.css            # 全局样式
├── index.html
├── package.json
└── vite.config.ts
```

## 💾 数据说明

- 日记与标签数据存储在浏览器 `localStorage` 中，key 分别为 `mood-diary-data` 与 `mood-diary-tags`
- 图片以 Base64 格式内嵌保存，因此清空浏览器数据会导致日记丢失，建议定期使用「导出 JSON」功能备份
- 主题偏好存储于 `mood-diary-theme`

## 📝 使用示例

1. 在「写日记」页面选择日期、心情与天气，填写内容并保存
2. 切换到「日历」页，查看当月每天的心情标记
3. 在「列表」页搜索、筛选历史日记，或导出为 JSON / TXT
4. 进入「统计」页，查看自己的情绪趋势与分布

## 📄 License

[MIT](./LICENSE)

