// import mongoose from "mongoose";

// const showSchema = new mongoose.Schema(
//   {
//     movie: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Movie",
//     },
//     theater: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Theater",
//     },
//     showTime: Date,
//     price: Number,
//     totalSeats: Number,
//     bookedSeats: [String], // ["A1", "A2"]
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Show", showSchema);


import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
    },
    showTime: Date,
    price: Number,
    totalSeats: Number,

    bookedSeats: [String], // permanently booked

    lockedSeats: [
      {
        seat: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        expiresAt: Date,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Show", showSchema);
