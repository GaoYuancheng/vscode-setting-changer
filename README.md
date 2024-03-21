### 介绍

拓展右键菜单 能够使用右键菜单 快捷改变当前工作区的 settings

#### vscode 插件开发文档

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

#### ⬜️ ...

### 发布

https://zhuanlan.zhihu.com/p/504218497

https://code.visualstudio.com/api/working-with-extensions/publishing-extension

1. npm install -g vsce

2. Get a Personal Access Token

3. Create Personal Access Tokens

4. Create a publisher

5. vsce login <publisher name>

6. vsce publish

### TODO

1. 修改为 pnpm 时发布会报错
