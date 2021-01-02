import { Request, Response } from "express";
import { success, failure, insufficientParameters, mongoError } from "../modules/common/service";
import { IGenre } from "../modules/genre/genre.model";
import GenreService from "../modules/genre/genre.service";

//import express = require("express");

export class GenreController {
  private genre_service: GenreService = new GenreService();

  public find_all(req: Request, res: Response): void {
    this.genre_service.findAll({}, (err: any, data: IGenre) => {
      if (err) {
        mongoError(err, res);
      } else {
        success(data, res);
      }
    });
  }
}
