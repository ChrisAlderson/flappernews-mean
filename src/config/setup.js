import bodyParser from "body-parser";
import compress from "compression";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import responseTime from "response-time";
import { global } from "./global";

const Setup = () => {

  const connectMongoDB = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${global.dbHosts.join(",")}/flappernews`, {
      db: {
        native_parser: true
      },
      replset: {
        rs_name: "users_repl",
        connectWithNoPrimary: true,
        readPreference: "nearest",
        strategy: "ping",
        socketOptions: {
          keepAlive: 1
        }
      },
      server: {
        readPreference: "nearest",
        strategy: "ping",
        socketOptions: {
          keepAlive: 1
        }
      }
    });
  };

  const setup = (app, logger) => {
    connectMongoDB();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(compress({threshold: 1400, level: 4, memLevel: 3}));
    app.use(responseTime());
    app.use(logger.expressLogger);
    app.set("view engine", "ejs");
    app.use(express.static(path.join(process.cwd(), "build", "views")));
    app.set("views", path.join(process.cwd(), "build", "views"));
    app.use(passport.initialize());
  };

  return { setup };

};

export default Setup;
