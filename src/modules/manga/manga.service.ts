import { IManga } from "./manga.model"; //For adding manga to the database later, IDK if I will use this feature tbh
import mangas from "./manga.schema";
import Mongoose from "mongoose";

export default class MangaService {
  public find(query: any, callback: any): void {
    mangas.aggregate(query, callback);
  }

  public findById(id: string, callback: any): void {
    mangas.aggregate([{ $match: { _id: new Mongoose.Types.ObjectId(id) } }], callback);
  }
}
