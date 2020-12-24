import { Application, Request, Response } from "express";
import { MangaController } from "../controllers/manga.controller";

export class MangaRoutes {
  private manga_controller: MangaController = new MangaController();

  public route(app: Application) {
    app.get(
      "/manga/:type/:include/:exclude/:scoreMin/:finished/:amount",
      (req: Request, res: Response) => {
        this.manga_controller.findByGenre(req, res);
      }
    );
  }
}
