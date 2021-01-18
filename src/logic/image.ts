import { Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export function resize(img_path: string, res: Response): void {
  try {
    res.writeHead(200, {
      "Content-Type": "image/jpg",
    });

    if (fs.existsSync(path.join(__dirname, img_path))) {
      const readStream = fs.createReadStream(path.join(__dirname, img_path));
      readStream.pipe(sharp().resize(240, 320)).pipe(res);
    } else {
      const readStream = fs.createReadStream(path.join(__dirname, "../assets/manga/images/notfound.jpg"));
      readStream.pipe(sharp().resize(240, 320)).pipe(res);
    }
  } catch (err) {
    console.error(err);
  }
}
