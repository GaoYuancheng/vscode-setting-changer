// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { open } from "fs";
import * as vscode from "vscode";
import { openByBrowser } from "./commands/openByBrowser";
import { settingChange } from "./commands/settingChange";
import { addCommaToEveryLine } from "./commands/addCommaToEveryLine";
import { openByCode } from "./commands/openByCode";
import { genIndexTs } from "./commands/genIndex";
export function activate(context: vscode.ExtensionContext) {
  // 切换自动保存配置
  const formatOnSaveSwitch = vscode.commands.registerCommand(
    "workspace-setting-changer.formatOnSaveSwitch",
    () => {
      settingChange({
        type: "switch",
        switchKeys: ["editor.formatOnSave"],
      });
    }
  );

  const helloWorld1 = vscode.commands.registerCommand(
    "workspace-setting-changer.helloWorld1",
    () => {
      settingChange({
        type: "change",
        newSetting: {
          helloWorld1: "hello world",
        },
      });
    }
  );

  // 使用浏览器打开
  const openByBrowserCommand = vscode.commands.registerCommand(
    "workspace-setting-changer.openByBrowser",
    (e) => {
      vscode.window.showInformationMessage("openByBrowser");
      openByBrowser(e.fsPath);
    }
  );

  // 在每行的最后添加逗号
  const addCommaToEveryLineCommand = vscode.commands.registerCommand(
    "workspace-setting-changer.addCommaToEveryLine",
    (e) => {
      vscode.window.showInformationMessage("addCommaToEveryLineCommand");
      addCommaToEveryLine(e.fsPath);
    }
  );

  // 使用 code 打开目录中文件夹
  const openByCodeCommand = vscode.commands.registerCommand(
    "workspace-setting-changer.openByCode",
    (e) => {
      vscode.window.showInformationMessage("openByCode");
      openByCode(e.fsPath);
    }
  );

  // 生成当前选中目录的 index.ts
  const genIndexTsCommand = vscode.commands.registerCommand(
    "workspace-setting-changer.genIndexTs",
    (e) => {
      vscode.window.showInformationMessage("genIndexTsCommand");
      genIndexTs(e.fsPath);
    }
  );

  // 生成当前选中目录的 index.ts 图片文件夹用
  const genIndexTsForImageCommand = vscode.commands.registerCommand(
    "workspace-setting-changer.genIndexTsForImage",
    (e) => {
      vscode.window.showInformationMessage("genIndexTsForImageCommand");
      genIndexTs(e.fsPath, {
        dirExportOption: {
          exportDefault: false,
          exportAll: true,
        },
        fileExportOption: {
          exportDefault: true,
          exportAll: false,
        },
      });
    }
  );

  context.subscriptions.push(
    formatOnSaveSwitch,
    helloWorld1,
    openByBrowserCommand,
    addCommaToEveryLineCommand,
    openByCodeCommand,
    genIndexTsCommand,
    genIndexTsForImageCommand
  );
}
export function deactivate() {}
