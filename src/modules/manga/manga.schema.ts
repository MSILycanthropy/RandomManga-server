import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    Title: { type: String, required: true },
    English: String,
    Japanese: String,
    Type: String,
    Volumes: Number,
    Chapters: Number,
    Genres: [],
    Authors: [],
    Serialization: String,
    Score: Number,
    Start: String,
    End: String,
    URL: { type: String, required: true },
    isFinished: Boolean,
    Synopsis: String,
  },
  { collection: "mangas" }
);

export default mongoose.model("mangas", schema);
