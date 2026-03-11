import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../apis";
import SeatGrid from "../components/SeatGrid";
import toast from "react-hot-toast";
import { loadRazorpay } from "../utils/razorpay";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  Clock,
  MapPin,
  Film,
  Calendar,
  IndianRupee,
  Ticket,
  ShieldCheck,
  Info,
} from "lucide-react";

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [locking, setLocking] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // 🔹 Fetch Show Details
  useEffect(() => {
    const fetchShow = async () => {
      try {
        const { data } = await API.get(`/shows/${showId}`);
        setShow(data);
      } catch (err) {
        toast.error("Show not found");
        navigate("/");
      }
    };

    fetchShow();
  }, [showId, navigate]);

  // Timer for locked seats
  useEffect(() => {
    if (locked) {
      setTimeLeft(300); // 5 minutes in seconds

      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setLocked(false);
            toast.error("Seat lock expired. Please lock again.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [locked]);

  if (!show)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0e27]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-[#1d8fff]/30 border-t-[#1d8fff] rounded-full"
        />
      </div>
    );

  // 🔒 Lock Seats
  const handleLock = async () => {
    if (selectedSeats.length === 0) {
      return toast.error("Please select at least one seat");
    }

    try {
      setLocking(true);

      await API.post("/shows/lock", {
        showId: show._id,
        seats: selectedSeats,
      });

      toast.success("Seats locked for 5 minutes");
      setLocked(true);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLocking(false);
    }
  };

  // 💳 Handle Razorpay Payment
  const handlePayment = async () => {
    if (!locked) {
      return toast.error("Please lock seats before payment");
    }

    try {
      setProcessingPayment(true);

      const sdkLoaded = await loadRazorpay();
      if (!sdkLoaded) {
        toast.error("Failed to load payment gateway");
        return;
      }

      // 1️⃣ Create order
      const { data } = await API.post("/payment/create-order", {
        showId: show._id,
        seats: selectedSeats,
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,
        name: show.movie?.title || "Movie Booking",
        description: "Movie Ticket Booking",
        handler: async function (response) {
          try {
            // 2️⃣ Verify payment
            await API.post("/payment/verify", {
              ...response,
              showId: show._id,
              seats: selectedSeats,
            });

            toast.success("Booking confirmed 🎉");
            navigate("/my-bookings");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#1d8fff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err.message);
    } finally {
      setProcessingPayment(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const totalAmount = selectedSeats.length * show.price;

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-50 bg-[#0a0e27]/95 backdrop-blur-md border-b border-[#1d8fff]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to={`/movie/${show.movie?._id}`}
            className="inline-flex items-center gap-2 text-[#EEEEEE]/70 hover:text-[#1d8fff] transition-colors group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium">Back to Movie</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show Info Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f1629] border border-[#1d8fff]/10 rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#1d8fff]/10 rounded-lg">
                  <Film className="text-[#1d8fff]" size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#EEEEEE]">
                  {show.movie?.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-[#EEEEEE]/70">
                  <MapPin size={16} className="text-[#1d8fff]" />
                  <div>
                    <p className="text-xs text-[#EEEEEE]/40">Theater</p>
                    <p className="text-sm font-medium">{show.theater?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#EEEEEE]/70">
                  <Calendar size={16} className="text-[#1d8fff]" />
                  <div>
                    <p className="text-xs text-[#EEEEEE]/40">Show Time</p>
                    <p className="text-sm font-medium">
                      {new Date(show.showTime).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[#EEEEEE]/70">
                  <IndianRupee size={16} className="text-[#1d8fff]" />
                  <div>
                    <p className="text-xs text-[#EEEEEE]/40">Price per seat</p>
                    <p className="text-sm font-semibold text-[#1d8fff]">
                      ₹{show.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timer */}
            {locked && timeLeft > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#1d8fff]/10 border border-[#1d8fff]/30 rounded-xl px-6 py-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="text-[#1d8fff]" size={20} />
                  <p className="text-[#EEEEEE]/60 text-xs font-medium">
                    Time Remaining
                  </p>
                </div>
                <p
                  className={`font-bold text-3xl ${timeLeft < 60 ? "text-red-600" : "text-[#1d8fff]"}`}
                >
                  {formatTime(timeLeft)}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Seat Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#EEEEEE] flex items-center gap-3">
                <Ticket className="text-[#1d8fff]" />
                Select Your Seats
              </h2>
              <p className="text-[#EEEEEE]/50 text-sm mt-1">
                Choose your preferred seats from the seating chart
              </p>
            </div>
          </div>

          {/* Seat Grid */}
          <div className="bg-[#0f1629] border border-[#1d8fff]/10 rounded-2xl p-6 md:p-8">
            <SeatGrid
              bookedSeats={show.bookedSeats || []}
              lockedSeats={(show.lockedSeats || []).map((l) => l.seat)}
              onSelect={setSelectedSeats}
            />
          </div>
        </motion.div>

        {/* Booking Summary - Fixed Bottom on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:relative fixed bottom-0 left-0 right-0 lg:bottom-auto z-40 p-4 lg:p-0"
        >
          <div className="bg-[#0f1629] border border-[#1d8fff]/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              {/* Summary */}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-[#1d8fff]" size={20} />
                  Booking Summary
                </h3>

                {selectedSeats.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#1d8fff]/10 rounded-lg">
                        <Ticket className="text-[#1d8fff]" size={16} />
                      </div>
                      <div>
                        <p className="text-[#EEEEEE]/50 text-xs mb-1">
                          Selected Seats
                        </p>
                        <p className="text-[#EEEEEE] font-semibold">
                          {selectedSeats.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#1d8fff]/10 rounded-lg">
                        <IndianRupee className="text-[#1d8fff]" size={16} />
                      </div>
                      <div>
                        <p className="text-[#EEEEEE]/50 text-xs mb-1">
                          Total Amount
                        </p>
                        <p className="text-[#1d8fff] font-bold text-2xl">
                          ₹{totalAmount}
                        </p>
                        <p className="text-[#EEEEEE]/40 text-xs">
                          {selectedSeats.length} × ₹{show.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#EEEEEE]/40 text-sm italic">
                    No seats selected yet
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto min-w-[200px]">
                <motion.button
                  onClick={handleLock}
                  disabled={locking || selectedSeats.length === 0 || locked}
                  whileHover={
                    !locking && selectedSeats.length > 0 && !locked
                      ? { scale: 1.02 }
                      : {}
                  }
                  whileTap={
                    !locking && selectedSeats.length > 0 && !locked
                      ? { scale: 0.98 }
                      : {}
                  }
                  className={`
                    flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-sm
                    ${
                      locked
                        ? "bg-[#1d8fff]/20 text-[#1d8fff] border border-[#1d8fff]/30 cursor-not-allowed"
                        : "bg-[#1d8fff]/10 text-[#1d8fff] border border-[#1d8fff]/30 hover:bg-[#1d8fff]/20 hover:border-[#1d8fff]/50"
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <Lock size={18} />
                  {locking
                    ? "Locking..."
                    : locked
                      ? "Seats Locked"
                      : "Lock Seats"}
                </motion.button>

                <motion.button
                  onClick={handlePayment}
                  disabled={processingPayment || !locked}
                  whileHover={
                    processingPayment || !locked ? {} : { scale: 1.02 }
                  }
                  whileTap={processingPayment || !locked ? {} : { scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-[#1d8fff] hover:bg-[#1d8fff]/90 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-[#1d8fff]/20 hover:shadow-[#1d8fff]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
                >
                  <CreditCard size={18} />
                  {processingPayment ? "Processing..." : "Pay & Confirm"}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 mb-20 lg:mb-6 bg-[#1d8fff]/5 border border-[#1d8fff]/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Info className="text-[#1d8fff] flex-shrink-0 mt-0.5" size={18} />
            <p className="text-[#EEEEEE]/60 text-sm">
              <strong className="text-[#EEEEEE]/80">Important:</strong> Locked
              seats are reserved for 5 minutes. Complete your payment before the
              timer expires to confirm your booking.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeatSelection;