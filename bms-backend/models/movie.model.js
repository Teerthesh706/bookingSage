import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    poster: String,
    duration: Number, // in minutes
    language: String,
    genre: [String],
    releaseDate: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Movie", movieSchema);
