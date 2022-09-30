import * as fs from "fs";
// 判断是否为一个工程目录  根据该目录下是否存在 package.json
export const isProjectDir = (path?: string) => {
  if (!path) {
    return false;
  }
  return fs.existsSync("package.json");
};
