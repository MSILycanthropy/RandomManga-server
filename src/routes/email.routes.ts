import { Application, Request, Response } from "express";
import { sendContactMail, sendReportMail } from "../logic/email";

export class EmailRoutes {
  public route(app: Application) {
    app.post("/contact", (req: Request, res: Response) => {
      sendContactMail(req, res);
    });

    app.post("/contact/report", (req: Request, res: Response) => {
      sendReportMail(req, res);
    });
  }
}
