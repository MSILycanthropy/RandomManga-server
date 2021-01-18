import { Request, Response } from "express";
import { failure, insufficientParameters } from "../modules/common/service";
import { resize } from "../logic/image";

export class ImageController {
  public getImage(req: Request, res: Response): void {
    if (req.params.path) {
      try {
        resize(`../assets/${req.params.path.replace(/-/g, "/")}.jpg`, res);
      } catch (e) {
        failure(e, {}, res);
      }
    } else {
      insufficientParameters(res);
    }
  }
}
