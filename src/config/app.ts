import express = require("express");
import * as bodyParser from "body-parser";
import helmet = require("helmet");
import cors = require("cors");
import mongoose = require("mongoose");
import { GenreRoutes } from "../routes/genre.routes";
import { CommonRoutes } from "../routes/common.routes";
import { MangaRoutes } from "../routes/manga.routes";
import path = require("path");

class App {
  public app: express.Application;
  private corsOptions: object;
  private genre_routes: GenreRoutes = new GenreRoutes();
  private common_routes: CommonRoutes = new CommonRoutes();
  private manga_routes: MangaRoutes = new MangaRoutes();
  private mongoConfig: object;
  private allowedDomain: string;
  private mongoURL: string =
    "mongodb+srv://Lycanthropy:brdU2aUpc1dtXdTs@randommanga.ecvu9.mongodb.net/RandomManga?retryWrites=true&w=majority";

  constructor() {
    this.app = express();
    if (process.env.NODE_ENV == "production") {
      this.allowedDomain = "https://randommanga.netlify.app/";
    } else {
      this.allowedDomain = "http://localhost:4200";
    }
    this.corsOptions = {
      origin: this.allowedDomain,
    };
    this.mongoConfig = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    this.config();
    this.mongoConnect();
    this.genre_routes.route(this.app);
    this.manga_routes.route(this.app);
    this.common_routes.route(this.app);
  }

  private config(): void {
    this.app.use("/assets", express.static(path.join(__dirname, "../assets")));

    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors(this.corsOptions));
  }

  private mongoConnect(): void {
    mongoose
      .connect(this.mongoURL, this.mongoConfig)
      .then(() => {
        console.log("Succesfully Connected to MongoDB");
      })
      .catch((err: Error) => {
        console.log(`Error connecting to MongoDB ${err.message}`);
      });
  }
}

export default new App().app;
