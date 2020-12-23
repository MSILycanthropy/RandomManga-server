import { Request, Response } from "express";
import {
  success,
  failure,
  insufficientParameters,
  mongoError,
} from "../modules/common/service";
import { IManga } from "../modules/manga/manga.model";
import MangaService from "../modules/manga/manga.service";
import { sort } from "../logic/sort";

//import express = require("express");

export class MangaController {
  private manga_service = new MangaService();

  public findByGenre(req: Request, res: Response) {
    console.log(req.params.scoreMin);
    if (
      req.params.include &&
      req.params.exclude &&
      req.params.scoreMin != "-1"
    ) {
      const agg = [
        {
          $match: {
            Score: {
              $gt: parseInt(req.params.scoreMin),
            },
          },
        },
        {
          $match: {
            Genres: {
              $nin: req.params.exclude.split("-"),
            },
          },
        },
        {
          $match: {
            Genres: {
              $in: req.params.include.split("-"),
            },
          },
        },
        {
          $unset: "img_data",
        },
        {
          $sample: {
            size: 1500,
          },
        },
      ];

      this.manga_service.find(agg, (err: any, data: Array<IManga>) => {
        if (err) {
          mongoError(err, res);
        } else {
          success(sort(data, req.params.include.split("-")), res);
        }
      });
    } else if (req.query.include && req.params.exclude && req.params.scoreMin) {
      const agg = [
        {
          $match: {
            Genres: {
              $nin: req.params.exclude.split("-"),
            },
          },
        },
        {
          $match: {
            Genres: {
              $in: req.params.include.split("-"),
            },
          },
        },
        {
          $unset: "img_data",
        },
        {
          $sample: {
            size: 1500,
          },
        },
      ];

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
}
