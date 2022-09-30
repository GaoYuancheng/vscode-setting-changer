// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { settingChange } from "./commands/settingChange";

export function activate(context: vscode.ExtensionContext) {
  // 当前打开的 编辑器窗口 path

  let formatOnSaveSwitch = vscode.commands.registerCommand(
    "formatOnSaveSwitch",
    () => {
      settingChange({
        type: "switch",
        switchKeys: ["editor.formatOnSave"],
      });
    }
  );
  let disposableHelloWorld1 = vscode.commands.registerCommand(
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

  context.subscriptions.push(formatOnSaveSwitch, disposableHelloWorld1);
}
export function deactivate() {}
