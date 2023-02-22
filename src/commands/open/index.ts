import * as os from "os";
import * as child_process from "child_process";
import * as vscode from "vscode";
import { platformInfo, platformMap } from "../../utils/platform";

const { browserCmd, pathSymbol } = platformInfo;

//  d:\git-repo-w\aaa\a.html
export const openByBrowser = (fsPath: string) => {
  if (!browserCmd || !fsPath) {
    return;
  }
  try {
    const url = fsPath.replaceAll("\\", pathSymbol);

    child_process.spawn(`${browserCmd} ${url}`, {
      shell: true,
    });
  } catch (err: any) {
    vscode.window.showErrorMessage(err);
  }
};
