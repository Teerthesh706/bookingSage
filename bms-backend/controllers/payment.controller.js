// import razorpay from "../config/razorpay.js";
// import crypto from "crypto";
// import Show from "../models/show.model.js";
// import { confirmBooking } from "./show.controller.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { showId, seats } = req.body;

//     const show = await Show.findById(showId);
//     if (!show) return res.status(404).json({ message: "Show not found" });

//     const amount = show.price * seats.length * 100; // Razorpay uses paisa

//     const options = {
//       amount,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Order creation failed" });
//   }
// };

// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       showId,
//       seats,
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Payment verification failed" });
//     }

//     // 🔥 If verified → confirm booking
//     req.body = { showId, seats };
//     await confirmBooking(req, res);
//   } catch (error) {
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };

import { getRazorpayInstance } from "../config/razorpay.js";

// import razorpay from "../config/razorpay.js";

import crypto from "crypto";
import Show from "../models/show.model.js";
import Booking from "../models/booking.model.js";

// 🔹 Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!showId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Invalid booking request" });
    }

    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const amount = show.price * seats.length * 100; // in paisa

    // const order = await razorpay.orders.create
    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// 🔹 Verify Payment & Confirm Booking
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      showId,
      seats,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    // 1️⃣ Verify signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 2️⃣ Fetch show
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    const now = new Date();

    // 3️⃣ Validate seats were locked by this user
    for (let seat of seats) {
      const lock = show.lockedSeats.find(
        (l) =>
          l.seat === seat &&
          l.user.toString() === req.user._id.toString() &&
          l.expiresAt > now,
      );

      if (!lock) {
        return res.status(400).json({
          message: `Seat ${seat} not properly locked`,
        });
      }
    }

    // 4️⃣ Move seats to booked
    show.bookedSeats.push(...seats);

    // Remove from lockedSeats
    show.lockedSeats = show.lockedSeats.filter((l) => !seats.includes(l.seat));

    await show.save();

    // 5️⃣ Create Booking Record
    const booking = await Booking.create({
      user: req.user._id,
      show: showId,
      seats,
      totalAmount: seats.length * show.price,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "confirmed",
    });

    res.json({
      message: "Payment successful & booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
