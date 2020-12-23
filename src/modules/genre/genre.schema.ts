import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    genre_name: { type: String, required: true },
  },
  { collection: "genre" }
);

export default mongoose.model("genre", schema);
