// import express from "express";
// import { protect } from "../middleware/auth.middleware.js";
// import { lockSeats, confirmBooking } from "../controllers/show.controller.js";
// import Show from "../models/show.model.js";

// const router = express.Router();

// router.post("/lock", protect, lockSeats);
// router.post("/confirm", protect, confirmBooking);

// router.get("/:id", async (req, res) => {
//   try {
//     const show = await Show.findById(req.params.id)
//       .populate("movie")
//       .populate("theater");

//     if (!show) {
//       return res.status(404).json({ message: "Show not found" });
//     }

//     res.json(show);
//   } catch (error) {
//     console.error("GET SHOW ERROR:", error);
//     res.status(500).json({ message: "Server error fetching show" });
//   }
// });



// export default router;


import express from "express";
import Show from "../models/show.model.js";
import { protect } from "../middleware/auth.middleware.js";
import { lockSeats, confirmBooking } from "../controllers/show.controller.js";

const router = express.Router();

// Specific routes first
router.post("/lock", protect, lockSeats);
router.post("/confirm", protect, confirmBooking);

// Then dynamic route
// router.get("/:id", async (req, res) => {
//   try {
//     const show = await Show.findById(req.params.id)
//       .populate("movie")
//       .populate("theater");

//     if (!show) {
//       return res.status(404).json({ message: "Show not found" });
//     }

//     res.json(show);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// 1️⃣ Specific routes FIRST
router.post("/lock", protect, lockSeats);
router.post("/confirm", protect, confirmBooking);

// 2️⃣ by-city route SECOND
router.get("/by-city", async (req, res) => {
  try {
    const { movieId, city } = req.query;

    const shows = await Show.find({ movie: movieId })
      .populate("theater");

    const filtered = shows.filter(
      (show) =>
        show.theater &&
        show.theater.city.toLowerCase() === city.toLowerCase()
    );

    res.json(filtered);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 3️⃣ Dynamic route LAST (VERY IMPORTANT)
router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie")
      .populate("theater");

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
