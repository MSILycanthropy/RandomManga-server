import { Request, Response } from "express";
import * as nodemailer from "nodemailer";

export function sendContactMail(req: Request, res: Response): void {
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
    if (!err) {
      res.end("Thanks for the feedback!");
    } else {
      res.end(`Something went wrong! \n ${err}`);
    }
  });
}

export function sendReportMail(req: Request, res: Response): void {
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
    subject: `Data update report from ${req.body.name}`,
    text: `\tName: ${req.body.name} \n\
           Email: ${req.body.email} \n\
           Title: ${req.body.title} \n\
           English Title: ${req.body.englishTitle} \n\
           Alternate Titles: ${req.body.alternateTitles}\n\
           Type: ${req.body.type} \n\
           Volumes: ${req.body.volumes} \n\
           Chapters: ${req.body.chapters} \n\
           Start Date: ${req.body.startDate} \n\
           End Date: ${req.body.endDate} \n\
           Finished: ${req.body.finished} \n\
           Authors: ${req.body.authors} \n\
           Genres: ${req.body.genres} \n\
           Synopsis: ${req.body.synopsis} \n\
           Other: ${req.body.other} \n\
          `,
  };

  smtpTrans.sendMail(options, (err: any, res: Response) => {
    if (!err) {
      res.end("Thanks for the feedback!");
    } else {
      console.log(err);

      res.end(`Something went wrong! \n ${err}`);
    }
  });
}

export function sendRequestMail(req: Request, res: Response): void {
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
    subject: `Manga Request from ${req.body.name}`,
    text: `\tName: ${req.body.name} \n\
           Email: ${req.body.email} \n\
           Title: ${req.body.title} \n\
           English Title: ${req.body.englishTitle} \n\
           Alternate Titles: ${req.body.alternateTitles}\n\
           Type: ${req.body.type} \n\
           Volumes: ${req.body.volumes} \n\
           Chapters: ${req.body.chapters} \n\
           Start Date: ${req.body.startDate} \n\
           End Date: ${req.body.endDate} \n\
           Finished: ${req.body.finished} \n\
           Authors: ${req.body.authors} \n\
           Genres: ${req.body.genres} \n\
           Synopsis: ${req.body.synopsis} \n\
           Other: ${req.body.other} \n\
          `,
  };

  smtpTrans.sendMail(options, (err: any, res: Response) => {
    if (!err) {
      res.end("Thanks for the feedback!");
    } else {
      console.log(err);

      res.end(`Something went wrong! \n ${err}`);
    }
  });
}
