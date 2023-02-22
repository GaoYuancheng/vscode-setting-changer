import * as fs from "fs";
import * as os from "os";
import * as vscode from "vscode";

type PlatformMap = {
  [key in NodeJS.Platform]: {
    pathSymbol: string;
    browserCmd: string;
  };
};

export const platformMap: PlatformMap = {
  win32: {
    pathSymbol: "\\",
    browserCmd: "start",
  },
  linux: {
    pathSymbol: "/",
    browserCmd: "x-www-browser",
  },
  darwin: {
    pathSymbol: "/",
    browserCmd: "open",
  },
  aix: {
    pathSymbol: "",
    browserCmd: "",
  },
  freebsd: {
    pathSymbol: "",
    browserCmd: "",
  },
  openbsd: {
    pathSymbol: "",
    browserCmd: "",
  },
  sunos: {
    pathSymbol: "",
    browserCmd: "",
  },
  android: {
    pathSymbol: "",
    browserCmd: "",
  },
  haiku: {
    pathSymbol: "",
    browserCmd: "",
  },
  cygwin: {
    pathSymbol: "",
    browserCmd: "",
  },
  netbsd: {
    pathSymbol: "",
    browserCmd: "",
  },
};

export const curPlatform = os.platform();

export const platformInfo = platformMap[curPlatform];

export const showErrorMessageForPlatform = () => {
  vscode.window.showErrorMessage(`暂不支持 ${curPlatform} 环境`);
};
