// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { open } from "fs";
import * as vscode from "vscode";
import { openByBrowser } from "./commands/open";
import { settingChange } from "./commands/settingChange";

export function activate(context: vscode.ExtensionContext) {
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

  let helloWord = vscode.commands.registerCommand(
    "workspace-setting-changer.openByBrowser",
    (e) => {
      vscode.window.showInformationMessage("openByBrowser");
      openByBrowser(e.fsPath);
    }
  );

  context.subscriptions.push(
    formatOnSaveSwitch,
    disposableHelloWorld1,
    helloWord
  );
}
export function deactivate() {}
