import GenreService from "../modules/genre/genre.service";
import { IGenre } from "../modules/genre/genre.model";
import { IManga } from "../modules/manga/manga.model";
import { oneHotEncode, score } from "./utils";

/**
 * Gets all the genres, and oneHotEncodes them
 */
var GENRES: Array<String> = [];
var ENCODED_GENRES: Array<number> = [];

export function getGenres(): void {
  new GenreService().findAll({}, (err: any, data: Array<IGenre>) => {
    GENRES = data.map((e) => e.genre_name);
    ENCODED_GENRES = oneHotEncode(GENRES);
  });
}
/**
 *
 * Sorts mangas based on how their geners match the genres we want
 *
 * @param mangas - The mangas to sort
 * @param want - The genres we want
 * @returns The sorted array of manga
 *
 * @beta
 */

export function sort(mangas: Array<IManga>, want: Array<any>): Array<IManga> {
  if (want[0] == "none") {
    return mangas;
  }
  var manga_genres: Array<any> = mangas.map((e) => e.Genres);
  //TODO: Transform these to maps so that they are more readable
  manga_genres = manga_genres.map((array) => array.map((e: any) => GENRES.findIndex((find) => find == e)));

  want = want.map((e) => GENRES.findIndex((find) => find == e));

  var scores = Array<number>(manga_genres.length);
  for (let i = 0; i < scores.length; i++) {
    scores[i] = score(manga_genres[i], want);
  }

  var sorted_scores: Array<number> = scores.slice(0);
  sorted_scores.sort(function (a, b) {
    return b - a;
  });

  var sorted: Array<any> = Array<number>(scores.length);
  for (let i = 0; i < sorted_scores.length; i++) {
    var move_index = scores.findIndex((e) => e == sorted_scores[i]);
    sorted[i] = mangas[move_index];
    scores[move_index] = NaN;
  }

  return sorted;
}
