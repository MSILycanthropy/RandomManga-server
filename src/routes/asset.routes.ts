import { Application, Request, Response } from "express";
import { ImageController } from "../controllers/image.controller";

export class AssetRoutes {
  private image_controller: ImageController = new ImageController();

  public route(app: Application) {
    app.get("/assets/:path.jpg", (req: Request, res: Response) => {
      console.log("poggers!!!!");

      this.image_controller.getImage(req, res);
    });
  }
}
