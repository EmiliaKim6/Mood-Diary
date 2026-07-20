# 心情日记 - 网页应用实施计划

## 概述
构建一个功能完整的网页版心情日记应用，使用 React + Vite 技术栈，数据存储在浏览器 localStorage 中。

## 当前状态
- 工作目录 `d:\测试` 为空，从零开始搭建

## 技术栈
- **框架**: React 18 + Vite
- **语言**: TypeScript
- **样式**: CSS Modules（或内联样式方案）
- **图表**: Chart.js / react-chartjs-2（心情趋势图）
- **图标**: 内联 SVG 或 emoji
- **数据存储**: localStorage
- **日期处理**: date-fns

## 核心功能模块

### 1. 日记编写
- 文本编辑区域（支持多行）
- 心情选择（5种心情等级：很棒/开心/一般/难过/糟糕，用表情符号表示）
- 天气记录（晴/多云/阴/雨/雪/风）
- 标签分类（可自定义标签，支持多选）
- 图片上传（Base64 存储到 localStorage，限制大小和数量）
- 日期选择（默认当天，可补写）

### 2. 日历视图
- 月历展示，每天显示心情图标
- 点击日期查看/编辑日记
- 有日记的日期高亮标记

### 3. 统计分析
- 心情趋势折线图（按周/月）
- 心情分布饼图
- 标签使用频率统计
- 天气与心情关联分析

### 4. 搜索功能
- 按关键词搜索日记内容
- 按心情筛选
- 按标签筛选
- 按日期范围筛选

### 5. 导出功能
- 导出为 JSON 文件
- 导出为 TXT 文本文件

### 6. 主题切换
- 亮色/暗色主题
- 跟随系统偏好

## 项目结构

```
d:\测试\
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── types/
│   │   └── diary.ts              # 类型定义
│   ├── utils/
│   │   ├── storage.ts            # localStorage 操作封装
│   │   ├── export.ts             # 导出功能
│   │   └── date.ts               # 日期工具函数
│   ├── hooks/
│   │   ├── useDiary.ts           # 日记数据管理 hook
│   │   └── useTheme.ts           # 主题管理 hook
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.tsx
│   │   │   └── Layout.css
│   │   ├── DiaryEditor/
│   │   │   ├── DiaryEditor.tsx
│   │   │   └── DiaryEditor.css
│   │   ├── CalendarView/
│   │   │   ├── CalendarView.tsx
│   │   │   └── CalendarView.css
│   │   ├── Statistics/
│   │   │   ├── Statistics.tsx
│   │   │   └── Statistics.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.css
│   │   ├── DiaryList/
│   │   │   ├── DiaryList.tsx
│   │   │   └── DiaryList.css
│   │   ├── DiaryDetail/
│   │   │   ├── DiaryDetail.tsx
│   │   │   └── DiaryDetail.css
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.tsx
│   │       └── ThemeToggle.css
│   └── constants/
│       └── index.ts              # 常量定义（心情、天气选项等）
```

## 数据模型

```typescript
interface Diary {
  id: string;           // UUID
  date: string;         // YYYY-MM-DD
  content: string;      // 日记内容
  mood: Mood;           // 心情等级
  weather: Weather;     // 天气
  tags: string[];       // 标签列表
  images: string[];     // Base64 图片数组
  createdAt: number;    // 创建时间戳
  updatedAt: number;    // 更新时间戳
}

type Mood = 'great' | 'good' | 'okay' | 'sad' | 'awful';
type Weather = 'sunny' | 'cloudy' | 'overcast' | 'rainy' | 'snowy' | 'windy';
```

## 实施步骤

### 步骤 1: 项目初始化
- 使用 `npm create vite@latest` 创建 React + TypeScript 项目
- 安装依赖: `date-fns`, `chart.js`, `react-chartjs-2`, `uuid`
- 配置基础项目结构

### 步骤 2: 基础框架搭建
- 创建类型定义 (`types/diary.ts`)
- 创建常量定义 (`constants/index.ts`)
- 实现 localStorage 工具 (`utils/storage.ts`)
- 实现日期工具 (`utils/date.ts`)
- 实现主题 hook (`hooks/useTheme.ts`)
- 实现日记数据管理 hook (`hooks/useDiary.ts`)
- 搭建 Layout 组件（导航栏 + 主内容区）

### 步骤 3: 日记编辑器
- 实现 DiaryEditor 组件
- 心情选择器（5个表情）
- 天气选择器
- 标签输入（支持自定义标签）
- 图片上传（转 Base64，限制 3 张，单张 < 500KB）
- 日期选择器

### 步骤 4: 日历视图
- 实现 CalendarView 组件
- 月历网格展示
- 每日心情图标显示
- 月份切换
- 点击日期跳转编辑/查看

### 步骤 5: 日记列表与详情
- DiaryList 组件（按时间倒序展示）
- DiaryDetail 组件（查看完整日记）
- 支持编辑和删除操作

### 步骤 6: 统计分析
- Statistics 组件
- 心情趋势折线图（近 7 天/30 天）
- 心情分布饼图
- 标签使用频率柱状图

### 步骤 7: 搜索功能
- SearchBar 组件
- 关键词搜索
- 按心情/标签/日期范围筛选
- 搜索结果列表展示

### 步骤 8: 导出功能
- 导出为 JSON
- 导出为 TXT
- 实现 `utils/export.ts`

### 步骤 9: 主题切换
- ThemeToggle 组件
- 亮色/暗色 CSS 变量
- 跟随系统偏好
- localStorage 持久化主题选择

### 步骤 10: 整体优化与联调
- 响应式布局适配
- 交互细节打磨
- 空状态处理
- 数据完整性校验

## 假设与决策
1. **图片存储**: 使用 Base64 编码存入 localStorage，限制单张 500KB、每篇日记最多 3 张，避免 localStorage 容量溢出
2. **路由方案**: 使用简单的状态切换而非 react-router，因为页面较少且无需 URL 路由
3. **样式方案**: 使用普通 CSS 文件 + CSS 变量实现主题切换，避免引入额外依赖
4. **ID 生成**: 使用 `crypto.randomUUID()` 生成唯一 ID，无需额外库
5. **图表库**: 使用 Chart.js + react-chartjs-2，轻量且功能足够

## 验证步骤
1. 项目能正常启动 (`npm run dev`)
2. 能创建、编辑、删除日记
3. 日历视图正确显示每日心情
4. 统计图表正确渲染
5. 搜索功能按各维度正确筛选
6. 导出功能生成正确格式的文件
7. 主题切换正常工作且刷新后保持
8. 响应式布局在移动端和桌面端均可正常使用
