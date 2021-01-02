import { Request, Response } from "express";
import { success, failure, insufficientParameters, mongoError } from "../modules/common/service";
import { resize, scale, scale_then_resize } from "../logic/image";
import fs from "fs";
import path = require("path");
import { W2XCJS, DEFAULT_MODELS_DIR } from "waifu2x-node";

export class ImageController {
  public getImage(req: Request, res: Response): void {
    if (req.params.path) {
      scale(`../assets/${req.params.path.replace(/-/g, "/")}.jpg`, res);
    } else {
      insufficientParameters(res);
    }
  }
}
