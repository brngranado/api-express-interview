import express, { Express, Request, Response, Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./src/routes/routes";
import "./app/config/core/Injector";
//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}/api`);
});
