// Import the neccesary modules.
import fs from "fs";
import path from "path";
import { global } from "./config/global";

const Util = () => {

  const createEmptyFile = path => fs.createWriteStream(path).end();

  const createTemp = () => {
    if (!fs.existsSync(global.tempDir)) fs.mkdirSync(global.tempDir);
    if (fs.existsSync(global.tempDir)) resetTemp();
  };

  const resetTemp = (tmpPath = global.tempDir) => {
    const files = fs.readdirSync(tmpPath);
    files.forEach(file => {
      const stats = fs.statSync(path.join(tmpPath, file));
      if (stats.isDirectory()) {
        resetTemp(file);
      } else if (stats.isFile()) {
        fs.unlinkSync(path.join(tmpPath, file));
      }
    });
  };

  const onError = errorMessage => {
    console.error(errorMessage);
    return new Error(errorMessage);
  };

  const search = (key, value) => element => element[key] === value;

  return { createTemp, onError, search };

};

export default Util;
