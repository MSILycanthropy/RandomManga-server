import { Request, Response } from "express";
import { success, failure, insufficientParameters, mongoError } from "../modules/common/service";
import { resize } from "../logic/image";
import fs from "fs";
import path = require("path");

export class ImageController {
  public getImage(req: Request, res: Response): void {
    if (req.params.path) {
      resize(`../assets/${req.params.path.replace(/-/g, "/")}.jpg`, res);
    } else {
      insufficientParameters(res);
    }
  }
}
