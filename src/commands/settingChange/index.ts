import * as vscode from "vscode";
import * as fs from "fs";
import * as os from "os";

const pathSymbolMap: Record<string, string> = {
  win32: "\\",
  linux: "/",
  // aix: "/",
  darwin: "/",
  // freebsd: "/",
  // openbsd: "/",
  // sunos: "/",
  // android: "/",
  // haiku: "/",
};

const curPlatform = os.platform();
const pathSymbol = pathSymbolMap[curPlatform] || "/";

interface CommonAction {}

interface SwitchCommandAction extends CommonAction {
  type: "switch";
  switchKeys: string[];
}

interface ChangeCommandAction extends CommonAction {
  type: "change";
  newSetting: Record<string, any>;
}

type CommandAction = SwitchCommandAction | ChangeCommandAction;

// 判断文件是属于 哪个工作区的 并且返回工作区 path
const findTargetWorkerSpace = (filePath?: string): undefined | string => {
  if (!filePath) {
    return undefined;
  }

  const { workspaceFolders } = vscode.workspace;
  const filePathArr = filePath.split(pathSymbol);

  const targetWorkerSpace = workspaceFolders?.find(
    (item) => item.uri.fsPath === filePath
  );
  if (targetWorkerSpace) {
    return targetWorkerSpace.uri.fsPath;
  }
  filePathArr.pop();
  const newFilePath = filePathArr.join(pathSymbol);
  return findTargetWorkerSpace(newFilePath);
};

// 读取 json 文件
const readSettingJson = (vscodeSettingFilePath: string) => {
  if (fs.existsSync(vscodeSettingFilePath)) {
    return JSON.parse(fs.readFileSync(vscodeSettingFilePath, "utf8"));
  }
  return null;
};

const getNewSetting = (oldJsonPath: string, commandAction: CommandAction) => {
  // 如果没有会返回null
  const oldSettingJson = readSettingJson(oldJsonPath) || {};

  const { type } = commandAction;
  let resSetting = { ...oldSettingJson };
  if (type === "switch") {
    const { switchKeys } = commandAction;
    switchKeys.forEach((key) => {
      // 没有配置过就置为 false 配置过就取反
      resSetting[key] =
        oldSettingJson[key] === undefined ? false : !oldSettingJson[key];
    });
  }
  if (type === "change") {
    const { newSetting } = commandAction;
    resSetting = {
      ...oldSettingJson,
      ...newSetting,
    };
  }

  return resSetting;
};

// 修改 .vscode/setting.json
const changeSettingJson = (dirPath: string, commandAction: CommandAction) => {
  const vscodeSettingDirPath = dirPath + `${pathSymbol}.vscode`;
  const vscodeSettingFilePath =
    vscodeSettingDirPath + `${pathSymbol}settings.json`;
  const newSetting = getNewSetting(vscodeSettingFilePath, commandAction);

  if (fs.existsSync(vscodeSettingDirPath)) {
    fs.writeFileSync(
      vscodeSettingFilePath,
      JSON.stringify(newSetting, null, 2)
    );
  } else {
    fs.mkdirSync(vscodeSettingDirPath);
    fs.writeFileSync(
      vscodeSettingFilePath,
      JSON.stringify(newSetting, null, 2)
    );
  }
};

export const settingChange = (actions: CommandAction) => {
  try {
    const activeTextEditorPath =
      vscode.window.activeTextEditor?.document.uri.fsPath;

    const targetDirPath = findTargetWorkerSpace(activeTextEditorPath);
    if (!targetDirPath) {
      vscode.window.showErrorMessage("未找到对应打开的工作区！");
      return;
    }

    changeSettingJson(targetDirPath, actions);

    vscode.window.showInformationMessage("操作成功");
  } catch (error: any) {
    vscode.window.showErrorMessage(error.message);
    console.log("error", error);
  }
};
