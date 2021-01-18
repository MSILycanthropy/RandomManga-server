import { Application, Request, Response } from "express";
import { sendContactMail, sendReportMail, sendRequestMail } from "../logic/email";

export class EmailRoutes {
  public route(app: Application) {
    app.post("/contact", (req: Request, res: Response) => {
      sendContactMail(req, res);
    });

    app.post("/contact/report", (req: Request, res: Response) => {
      sendReportMail(req, res);
    });

    app.post("/contact/request-manga", (req: Request, res: Response) => {
      sendRequestMail(req, res);
    });
  }
}
