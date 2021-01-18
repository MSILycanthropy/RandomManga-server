import { Request, Response } from "express";
import { success, failure, insufficientParameters, mongoError } from "../modules/common/service";
import { IManga } from "../modules/manga/manga.model";
import MangaService from "../modules/manga/manga.service";
import { sort } from "../logic/sort";
import * as schedule from "node-schedule";
const sha1 = require("sha1");

var dailies: Array<IManga>;
function setDailies(): void {
  let manga_service = new MangaService();
  const agg = [{ $match: { Score: { $ne: null } } }, { $sample: { size: 10 } }, { $sort: { Score: -1 } }];
  manga_service.find(agg, (err: any, data: Array<IManga>) => {
    if (err) {
      console.error(err);
    } else {
      dailies = data;
    }
  });
}

setDailies();
schedule.scheduleJob("0 0 * * * ", () => {
  setDailies();
});

export class MangaController {
  private manga_service = new MangaService();

  public getDailies(res: Response): void {
    if (dailies) {
      success(dailies, res);
    } else {
      failure("Dailies not found", {}, res);
    }
  }

  public findById(req: Request, res: Response): void {
    if (req.params.id) {
      this.manga_service.findById(req.params.id, (err: any, data: IManga) => {
        if (!err) {
          success(data, res);
        } else {
          mongoError(err, res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public findByGenre(req: Request, res: Response): void {
    if (req.params.include && req.params.exclude && req.params.type && req.params.scoreMin && req.params.amount) {
      if (process.env.NODE_ENV == "production") {
        const secret_lol = "47eecfdece6dfb851fec9b2b7bdfe48c71cb0008f2728d32250a578f172b849c";
        const hash = sha1(
          `${req.params.type}${secret_lol}${req.params.include}\
        ${req.params.exclude}${req.params.scoreMin}${req.params.amount}`.replace(/ /g, "")
        );

        if (hash != req.query.gamma) {
          failure("My server runs off of a raspberry pi, so just ask for the data you want please 💖", {}, res);
          return;
        }
      }

      const base_agg = [{ $sample: { size: parseInt(req.params.amount) } }];
      let include_agg: object, exclude_agg: object, type_agg: object, scoreMin_agg: object, finished_agg: object;

      include_agg = exclude_agg = type_agg = scoreMin_agg = finished_agg = {
        $match: { _id: { $exists: true } },
      };

      if (req.params.include != "none") {
        include_agg = { $match: { Genres: { $in: req.params.include.split("-") } } };
      }
      if (req.params.exclude != "none") {
        exclude_agg = { $match: { Genres: { $nin: req.params.exclude.split("-") } } };
      }
      if (req.params.type != "All") {
        type_agg = { $match: { Type: req.params.type } };
      }
      if (req.params.scoreMin != "NaN") {
        scoreMin_agg = { $match: { Score: { $gt: parseInt(req.params.scoreMin) } } };
      }
      if (req.params.finished) {
        finished_agg = { $match: { isFinished: req.params.finished == "true" } };
      }

      var agg = [type_agg, exclude_agg, include_agg, scoreMin_agg, finished_agg, ...base_agg];

      this.manga_service.find(agg, (err: any, data: Array<IManga>) => {
        if (err) {
          mongoError(err, res);
        } else {
          success(sort(data, req.params.include.split("-")), res);
        }
      });
    } else {
      insufficientParameters(res);
    }
  }

  public search(req: Request, res: Response) {
    const agg = [{ $match: { $text: { $search: req.params.search } } }, { $sort: { Score: -1 } }];
    this.manga_service.find(agg, (err: any, data: Array<IManga>) => {
      if (err) {
        mongoError(err, res);
      } else {
        success(data, res);
      }
    });
  }
}
