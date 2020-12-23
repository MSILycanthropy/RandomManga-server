import { IManga } from "./manga.model"; //For adding manga to the database later, IDK if I will use this feature tbh
import mangas from "./manga.schema";

export default class MangaService {
  public find(query: any, callback: any): void {
    mangas.aggregate(query, callback);
  }
}
