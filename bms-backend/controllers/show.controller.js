import Show from "../models/show.model.js";

export const lockSeats = async (req, res) => {
  const { showId, seats } = req.body;
  const userId = req.user._id;

  const show = await Show.findById(showId);

  if (!show) return res.status(404).json({ message: "Show not found" });

  const now = new Date();

  // Remove expired locks
  show.lockedSeats = show.lockedSeats.filter((lock) => lock.expiresAt > now);

  // Check if seats already booked or locked
  for (let seat of seats) {
    if (show.bookedSeats.includes(seat)) {
      return res.status(400).json({ message: `Seat ${seat} already booked` });
    }

    const isLocked = show.lockedSeats.find((lock) => lock.seat === seat);

    if (isLocked) {
      return res.status(400).json({ message: `Seat ${seat} locked` });
    }
  }

  const expiry = new Date(now.getTime() + 5 * 60 * 1000); // 5 min

  seats.forEach((seat) => {
    show.lockedSeats.push({
      seat,
      user: userId,
      expiresAt: expiry,
    });
  });

  await show.save();

  res.json({ message: "Seats locked", expiresAt: expiry });
};

export const confirmBooking = async (req, res) => {
  const { showId, seats } = req.body;
  const userId = req.user._id;

  const show = await Show.findById(showId);
  if (!show) return res.status(404).json({ message: "Show not found" });

  const now = new Date();

  // Validate locks belong to user
  for (let seat of seats) {
    const lock = show.lockedSeats.find(
      (l) =>
        l.seat === seat &&
        l.user.toString() === userId.toString() &&
        l.expiresAt > now,
    );

    if (!lock)
      return res.status(400).json({
        message: `Seat ${seat} not properly locked`,
      });
  }

  // Move seats to booked
  show.bookedSeats.push(...seats);

  // Remove from lockedSeats
  show.lockedSeats = show.lockedSeats.filter((l) => !seats.includes(l.seat));

  await show.save();

  res.json({ message: "Booking confirmed" });
};