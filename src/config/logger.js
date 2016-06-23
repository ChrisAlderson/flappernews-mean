import expressWinston from "express-winston";
import fs from "fs";
import sprintf from "sprintf";
import winston from "winston";
import { global } from "./global";
import packageJSON from "../../package.json";

const Logger = console => {

  if (!fs.existsSync(global.tempDir)) fs.mkdirSync(global.tempDir);

  const checkEmptyMessage = args => {
    if (args.message === "" && Object.keys(args.meta).length !== 0)
      args.message = JSON.stringify(args.meta);

    return args;
  };

  const consoleFormatter = args => {
    let levelColor = "";
    switch (args.level) {
    case "error":
      levelColor = "\x1b[31m";
      break;
    case "warn":
      levelColor = "\x1b[33m";
      break;
    case "info":
      levelColor = "\x1b[36m";
      break;
    case "debug":
      levelColor = "\x1b[34m";
      break;
    default:
      levelColor = "\x1b[36m";
      break;
    }

    args = checkEmptyMessage(args);
    return sprintf(`\x1b[0m[%s] ${levelColor}%5s:\x1b[0m %2s/%d: \x1b[36m%s\x1b[0m`,
      new Date().toISOString(), args.level.toUpperCase(), packageJSON.name,
      process.pid, args.message);
  };

  const fileFormatter = args => {
    args = checkEmptyMessage(args);
    return JSON.stringify({
      name: packageJSON.name,
      pid: process.pid,
      level: args.level,
      msg: args.message,
      time: new Date().toISOString()
    });
  };

  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        name: packageJSON.name,
        formatter: consoleFormatter,
        handleExceptions: true,
        prettyPrint: true
      }),
      new winston.transports.File({
        filename: `${global.tempDir}/${packageJSON.name}.log`,
        level: "warn",
        json: false,
        formatter: fileFormatter,
        maxsize: 5242880,
        handleExceptions: true
      })
    ],
    exitOnError: false
  });

  const expressLogger = new expressWinston.logger({winstonInstance: logger, expressFormat: true});

  console.log = msg => logger.info(msg);
  console.error = msg => logger.error(msg);
  console.warn = msg => logger.warn(msg);
  console.info = msg => logger.info(msg);
  console.debug = msg => logger.debug(msg);

  const reset = () => {
    if (fs.existsSync(`${global.tempDir}/${packageJSON.name}.log`))
      fs.unlinkSync(`${global.tempDir}/${packageJSON.name}.log`);
  };

  return { expressLogger, logger, reset };

};

export default Logger;
