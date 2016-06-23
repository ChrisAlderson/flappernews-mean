import cluster from "cluster";
import domain from "domain";
import express from "express";
import os from "os";
import { global } from "./config/global";
import Logger from "./config/logger";
import Routes from "./config/routes";
import Setup from "./config/setup";
import Util from "./util";

const Index = () => {

  const util = Util();

  const startAPI = () => {
    const logger = Logger(console);
    const app = express();

    Setup().setup(app, logger);
    Routes().routes(app);

    if (cluster.isMaster) {
      logger.reset();

      util.createTemp();

      for (let i = 0; i < Math.min(os.cpus().length, global.workers); i++)
        cluster.fork();

      cluster.on("exit", worker => {
        util.onError(`Worker '${worker.process.pid}' died, spinning up another!`);
        cluster.fork();
      });

      if (global.master) {
        const scope = domain.create();
        scope.run(() => console.log("API started"));
        scope.on("error", err => util.onError(err));
      }
    } else {
      app.listen(global.port);
    }
  };

  return { startAPI };

};

Index().startAPI();

export default Index;
