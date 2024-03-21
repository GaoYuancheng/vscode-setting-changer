import * as os from "os";
import * as fs from "fs";

export const addCommaToEveryLine = (fsPath: string) => {
  // 获取换行符
  const eol = os.EOL;

  // 单行注释正则
  const singleLineCommentRegex = /\/\/.*/;

  const curFileData = fs.readFileSync(fsPath, {
    encoding: "utf-8",
  });

  const lines = curFileData.split(eol);
  const newLines = lines.map((line) => {
    // const [commentSymbol] = line.match(singleLineCommentRegex) || [];

    // // 没有注释 直接加 ,
    // if (!commentSymbol) return `${line},`;

    // // 按照注释符分割
    // const [content, comment] = line.split(commentSymbol);

    // // 空行 不处理
    // if (!content.trim()) return line;

    // return `${content},${commentSymbol}${comment}`;
    return `"${line.replace(/"/g, "'")}",`;
  });

  const res = newLines.join(eol);
  fs.writeFileSync(fsPath, res);
};
