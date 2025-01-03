### 介绍

拓展右键菜单 能够使用右键菜单 快捷改变当前工作区的 settings

#### vscode 插件开发文档

中文

https://vscode.github.net.cn/api/references/vscode-api

GET STARTED

https://code.visualstudio.com/api/get-started/your-first-extension

VSCODE API

https://code.visualstudio.com/api/references/vscode-api

### 功能

#### ✅ 修改当前工作区的 editor.formatOnSave

打开的文件 => 右键菜单 => 修改工作区配置 => editor.formatOnSave 切换

#### ✅ 对于在浏览器中其中打开

左侧资源区/代码区 => 右键菜单 => 在浏览器中打开

#### ✅ 在代码的每行最后都添加逗号

打开的文件 => 右键菜单 => 修改工作区配置 => 在每行的最后添加逗号

#### ✅ 使用 code 打开文件夹

左侧资源区 => 右键菜单 => 使用 code 打开

#### ✅ 在当前文件夹下生成 index.ts 引用并导出当前文件夹下所有的文件

左侧资源区选择文件夹 => 右键菜单 => 生成 indexTs（覆盖）

#### ⬜️ ...

### 开发

1. npm run watch
2. 调试模式启动 Run Extension

### 发布

https://zhuanlan.zhihu.com/p/504218497

https://code.visualstudio.com/api/working-with-extensions/publishing-extension

https://marketplace.visualstudio.com/manage/publishers/gyc

1. vsce publish
2. token 过期需要重新获取 https://dev.azure.com/389152147/_usersSettings/tokens
3. vsce login GYC

### TODO

1. 修改为 pnpm 时发布会报错
