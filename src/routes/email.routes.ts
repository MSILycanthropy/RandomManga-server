import { Application, Request, Response } from "express";
import { sendMail } from "../logic/email";

export class EmailRoutes {
  public route(app: Application) {
    app.post("/contact", (req: Request, res: Response) => {
      sendMail(req, res);
    });
  }
}
