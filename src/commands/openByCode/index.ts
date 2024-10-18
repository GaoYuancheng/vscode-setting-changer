import { commands, Uri } from "vscode";

// 使用code 打开
export const openByCode = async (fsPath: string) => {
  let uri = Uri.file(fsPath);
  await commands.executeCommand("vscode.openFolder", uri, {
    forceNewWindow: true,
  });
};
