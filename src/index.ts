import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import * as morgan from "morgan";
import * as express from "express";
import * as cors from "cors";

let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  })
);

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

server.setConfig((app) => {
  initializeApp({
    credential: cert({
      projectId: "my-name-project-id",
      clientEmail:
        "my-firebase-client",
      privateKey:
        "myprivatekey"
  });
});

server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
});

let app = server.build();
app.listen(process.env.PORT || 9200);
