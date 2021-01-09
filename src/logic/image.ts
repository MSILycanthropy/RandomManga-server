import { Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export function resize(img_path: string, res: Response): void {
  const readStream = fs.createReadStream(path.join(__dirname, img_path));
  res.writeHead(200, {
    "Content-Type": "image/jpg",
  });
  readStream.pipe(sharp().resize(240, 320)).pipe(res);
}
