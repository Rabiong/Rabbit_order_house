# Bunny Bites · 兔兔小厨房

一个可爱风格的在线点餐系统，支持菜品浏览、购物车、订单管理、用户系统、AI 对话助手等功能。

## 技术栈

- **前端**: HTML + Tailwind CSS + Font Awesome
- **后端**: Moonbit
- **AI 助手**: 基于规则引擎的对话代理（意图解析 + 回复生成）

## 功能特性

- 🍽️ **菜品浏览** — 按分类筛选、搜索菜品
- 🛒 **购物车** — 添加/删除/修改数量，实时计算总价
- 👤 **用户系统** — 注册/登录、个人信息管理、收货地址管理
- ❤️ **收藏夹** — 收藏喜欢的菜品
- 📋 **订单管理** — 下单、查看订单状态、取消订单
- 📊 **后台管理** — 菜品统计、订单管理仪表盘
- 🤖 **AI 小助手** — 自然语言点餐、菜品推荐、订单查询
- 🌙 **深色模式** — 明暗主题切换
- 🌐 **多语言** — 中英文切换

## 快速开始

### 前端

直接用浏览器打开 `web/index.html` 即可预览。

或在项目根目录启动一个 HTTP 服务：

```bash
# Python
python -m http.server 8081 -d web
```

### 后端（Moonbit）

```bash
moon run src/main
```

## 项目结构

```
Rabbit_order/
├── web/                    # 前端
│   ├── index.html         # 主页面
│   ├── css/style.css      # 样式
│   └── js/
│       ├── app.js         # 前端逻辑
│       └── agent/         # AI 小助手
│           ├── agent.js
│           ├── agent-parser.js
│           ├── agent-responder.js
│           └── agent-ui.js
├── src/                    # Moonbit 后端
│   ├── main.mbt           # 入口
│   ├── dish.mbt           # 菜品模块
│   ├── cart.mbt           # 购物车
│   ├── cart_engine.mbt
│   ├── order.mbt          # 订单
│   ├── order_engine.mbt
│   ├── menu.mbt           # 菜单
│   ├── user.mbt           # 用户
│   ├── address.mbt        # 地址
│   ├── favorite.mbt       # 收藏
│   ├── admin.mbt          # 管理
│   └── storage.mbt        # 持久化
├── .gitignore
└── moon.mod.json
```
