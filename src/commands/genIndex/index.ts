import { commands, Uri } from "vscode";
import * as fs from "fs";
import * as path from "path";

interface ExportOptions {
  exportDefault: boolean;
  exportAll: boolean;
}
interface Options {
  fileExportOption?: ExportOptions;
  dirExportOption?: ExportOptions;
}

// 大写首字母
const capitalizeFirstLetter = (str: string): string => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const jsModuleExtension = ["js", "ts", "jsx", "tsx"];

const getExportContent = (
  fileName: string,
  componentName: string,
  options?: ExportOptions
) => {
  let indexTsContent = "";
  const { exportDefault = true, exportAll = true } = options || {};
  if (exportDefault) {
    indexTsContent += `export { default as ${componentName} } from './${fileName}';\n`;
  }
  if (exportAll) {
    indexTsContent += `export * from './${fileName}';\n`;
  }

  return indexTsContent;
};

// 生成对应 index
export const genIndexTs = (fsPath: string, options?: Options) => {
  const { fileExportOption, dirExportOption } = options || {};

  // 获取当前目录下的所有文件
  const files = fs
    .readdirSync(fsPath, { withFileTypes: true })
    .filter((file) => {
      const [componentName, ext] = file.name.split(".");

      // 去除 当前目录下的 index
      return componentName.toLowerCase() !== "index";
    });

  // 生成index.ts文件内容
  let indexTsContent = "";
  files.forEach((file) => {
    const [componentName, ext] = file.name.split(".");

    const isDir = !ext;
    if (isDir) {
      indexTsContent += getExportContent(
        file.name,
        componentName,
        dirExportOption
      );
    } else if (jsModuleExtension.includes(ext)) {
      indexTsContent += getExportContent(
        file.name,
        componentName,
        fileExportOption
      );
    } else {
      console.log("ext", ext, file.name);
      indexTsContent += `export { default as ${componentName}${capitalizeFirstLetter(
        ext
      )} } from './${file.name}';\n`;
    }
  });
  indexTsContent += "\n";

  // 将生成的内容写入index.ts文件
  const indexTsFilePath = path.join(fsPath, "index.ts");
  fs.writeFileSync(indexTsFilePath, indexTsContent);
};
