import { commands, Uri } from "vscode";
import * as fs from "fs";
import * as path from "path";

// 大写首字母
const capitalizeFirstLetter = (str: string): string => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
};

const jsModuleExtension = ["js", "ts", "jsx", "tsx"];

// 生成对应 index
export const genIndexTs = async (fsPath: string) => {
  // 获取当前目录下的所有文件
  const files = fs
    .readdirSync(fsPath, { withFileTypes: true })
    .filter((file) => {
      const [componentName, ext] = file.name.split(".");

      // 去除 当前目录下的 index
      return componentName.toLowerCase() !== "index";
    });
  console.log("genIndexTs ~ uriPath:", fsPath, files);

  // 生成index.ts文件内容
  let indexTsContent = "";
  files.forEach((file) => {
    const [componentName, ext] = file.name.split(".");

    const isDir = !ext;

    if (jsModuleExtension.includes(ext) || isDir) {
      indexTsContent += `export { default as ${componentName} } from './${file.name}';\n`;
      indexTsContent += `export * from './${file.name}';\n`;
    } else {
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
