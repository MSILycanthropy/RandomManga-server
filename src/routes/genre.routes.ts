import { Application, Request, Response } from "express";
import { GenreController } from "../controllers/genre.controller";

export class GenreRoutes {
  private genre_controller: GenreController = new GenreController();

  public route(app: Application) {
    app.get("/genre/all", (req: Request, res: Response) => {
      this.genre_controller.find_all(req, res);
    });

    app.get("/genre/:id", (req: Request, res: Response) => {
      res.send({ message: `You wanted genre ${req.params.id}` });
    });
  }
}
