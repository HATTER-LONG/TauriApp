# Quasar App (quasar-project)

A Quasar Project

## 项目模板搭建

1. 创建 Quasar 项目 : `pnpm create quasar@latest`;
2. 安装 Quasar CLI : `pnpm add -g @quasar/cli`;
3. 项目开发 : `quasar dev`;
4. 项目打包 : `quasar build`;
5. 配置 tauri : `pnpm add -D @tauri-apps/cli@latest`;
6. 初始化 tauri : `pnpm tauri init`;
7. 配置 tauri dev 与 build : `quasar dev` 与 `quasar build`;
8. 配置 tauri port : `9000`;
9. 启动 tauri : `pnpm tauri dev`;

> [quasar quick start](https://quasar.dev/start/quick-start)
> [tauri quick start](https://v2.tauri.app/start/create-project/)

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
