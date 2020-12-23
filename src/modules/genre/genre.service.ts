import { IGenre } from "./genre.model"; //For creating Genres that I might add later.
import genres from "./genre.schema";

export default class GenreService {
  public findAll(query: any, callback: any): void {
    genres.find(query, callback);
  }
}
