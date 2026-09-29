# 青岚工作室官网

用 Vue 3 + Vite 重写的静态官网。保留原站的工作室介绍、22 个项目、成员与支持者、Minecraft 服务器说明、壁纸收藏和音乐，改善阅读层级、移动导航与键盘操作。

## 本地运行

需要 Node.js 22.12+（推荐 Node.js 24）和 npm，依赖版本由 `package-lock.json` 固定。

```powershell
npm ci
npm run dev
```

访问终端显示的本地地址。

```powershell
npm run build
npm run preview
```

构建产物在 `dist/`，只部署该目录。

## 页面与内容维护

- `index.html`：工作室首页，作品分类、成员、联系方式。
- `mc.html`：TLVD / TLSV / TLCV 介绍和地址复制。
- `file.html`：游戏发布页入口、壁纸搜索、横竖版下载。
- `sb.html`：保留原站彩蛋入口。
- `src/data.js`：项目、团队、壁纸列表与外部链接。
- `src/components/`：页面组件及共用图标。
- `src/App.vue`：导航、页脚、音乐开关。
- `src/style.css`：配色、布局、响应式和减少动效支持。
- `image/bg/`：原始壁纸，供下载使用。
- `image/optimized/`：WebP 预览、服务器图与头像。新增壁纸时需同步提供 `${id}_pc.webp` 和 `${id}_phone.webp` 预览。

原始图片、音频和旧 `index.css` 保留供追溯；新页面不加载旧 CSS。音乐只在用户主动点击后播放。插画用于保留原站气质，作品卡片使用文字视觉，避免将壁纸误认为游戏实机画面。外部链接在新标签页打开。

项目状态、服务器版本和地址沿用原站记录，未声称实时在线。MonsterRun 原站本地下载不可用，现改为官方仓库 Releases 入口；核查时该仓库暂无公开 release，下载页会引导查看后续发布，而不提供失效的 exe 链接。后续可以在 `src/data.js` 修改 `links.releases`。

## GitHub Pages

工作流位于 `.github/workflows/pages.yml`：

1. PR 到 `main`：安装依赖、格式检查、构建、桌面和移动端浏览器测试。
2. 推送到 `main` 或在 `main` 手动运行：通过检查后上传 `dist/`，部署到 `github-pages` 环境。
3. 仅部署任务拥有 `pages: write`、`id-token: write` 权限；PR 不部署。

仓库首次启用时，在 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**，然后将重写后的完整文件提交并推送到 `main`。无需 PAT、无需 `gh-pages` 分支，也无需将 `dist/` 提交进仓库。

`base: './'` 配合真实 HTML 入口，使仓库子路径、用户站点和自定义域名都能解析资源；页面直达与刷新不依赖 SPA fallback。测试特意在 `/QinglanStudioOfficialWeb/` 子路径运行。

参考：[Vite 官方部署说明](https://vite.dev/guide/static-deploy#github-pages)。工作流使用固定的官方 Action 提交版本。

## 验证

```powershell
npm exec playwright install chromium
npm run format:check
npm run build
npm test
```

测试涵盖作品分类与展开、壁纸搜索和下载、服务器地址复制及失败提示、音乐开关、移动导航、子路径直达、图片加载和横向溢出。截图自动保存到被忽略的 `test-results/`。

```powershell
npm run format
```

使用 Prettier 统一格式。未引入后端或个人数据收集。
