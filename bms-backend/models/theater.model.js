import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: String,
  },
  { timestamps: true },
);

export default mongoose.model("Theater", theaterSchema);
