import { Request, Response } from "express";
import { success, failure, insufficientParameters, mongoError } from "../modules/common/service";
import { IManga } from "../modules/manga/manga.model";
import MangaService from "../modules/manga/manga.service";
import { sort } from "../logic/sort";

//import express = require("express");

export class MangaController {
  private manga_service = new MangaService();

  public findByGenre(req: Request, res: Response) {
    if (
      req.params.include &&
      req.params.exclude &&
      req.params.type &&
      req.params.scoreMin &&
      req.params.amount
    ) {
      const base_agg = [{ $sample: { size: parseInt(req.params.amount) } }];
      var include_agg: object,
        exclude_agg: object,
        type_agg: object,
        scoreMin_agg: object,
        finished_agg: object;

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
      if (req.params.finished_agg) {
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
}
