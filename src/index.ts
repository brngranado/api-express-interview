import * as bodyParser from "body-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import * as morgan from "morgan";
import * as express from "express";

let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));

const server = new InversifyExpressServer(
  container,
  null,
  {
    rootPath: "/api/",
  },
  expressApp
);

server.setConfig((app) => {
  var logger = morgan("combined");
  app.use(logger);
});

server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
});

let app = server.build();
app.listen(process.env.PORT || 9200);
