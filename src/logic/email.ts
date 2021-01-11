import { Request, Response } from "express";
import * as nodemailer from "nodemailer";
import { failure, success } from "../modules/common/service";

export function sendMail(req: Request, res: Response): void {
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "RNGmanga.com@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const options = {
    from: "Test",
    to: "RNGmanga.com@gmail.com",
    subject: `Feedback from ${req.body.name}`,
    text: `Name: ${req.body.name} \nEmail: ${req.body.email} \nMessage: ${req.body.message}`,
  };

  smtpTrans.sendMail(options, (err: any, res: Response) => {
    console.log("sending!");
    console.log(req.body);

    if (!err) {
      res.end("Thanks for the feedback!");
    } else {
      res.end(`Something went wrong! \n ${err}`);
    }
  });
}
