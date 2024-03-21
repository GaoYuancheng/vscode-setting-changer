// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { open } from "fs";
import * as vscode from "vscode";
import { openByBrowser } from "./commands/open";
import { settingChange } from "./commands/settingChange";

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
      // openByBrowser(e.fsPath);
    }
  );

  context.subscriptions.push(
    formatOnSaveSwitch,
    helloWorld1,
    openByBrowserCommand,
    addCommaToEveryLineCommand
  );
}
export function deactivate() {}
