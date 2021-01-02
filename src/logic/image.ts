import { Response } from "express";
import fs from "fs";
import { W2XCJS, DEFAULT_MODELS_DIR } from "waifu2x-node";
import path from "path";
const converter = new W2XCJS();
const err = converter.loadModels(DEFAULT_MODELS_DIR);

export function scale(img_path: string, res: Response): void {
  if (!err) {
    const input_buffer = fs.readFileSync(path.join(__dirname, img_path));
    const output_buffer = converter.convertBuffer(input_buffer, ".JPG", 2);

    res.writeHead(200, {
      "Content-Type": "image/jpg",
    });

    res.end(output_buffer);
  }
}

export function resize(): void {}

export function scale_then_resize(): void {}
