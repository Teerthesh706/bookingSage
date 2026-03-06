import { useState } from "react";
import { motion } from "framer-motion";
import { Armchair } from "lucide-react";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

const SeatGrid = ({ bookedSeats, lockedSeats, onSelect }) => {
  const [selected, setSelected] = useState([]);

  const generateSeats = () => {
    const seats = [];
    rows.forEach((row) => {
      for (let i = 1; i <= 12; i++) {
        seats.push(`${row}${i}`);
      }
    });
    return seats;
  };

  const seats = generateSeats();

  const handleClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    if (lockedSeats.includes(seat)) return;

    let updated;

    if (selected.includes(seat)) {
      updated = selected.filter((s) => s !== seat);
    } else {
      updated = [...selected, seat];
    }

    setSelected(updated);
    onSelect(updated);
  };

  const getSeatsByRow = (row) => {
    return seats.filter((seat) => seat.startsWith(row));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Screen */}
      <div className="mb-12">
        <div className="relative">
          <div className="h-1 bg-gradient-to-r from-transparent via-[#1d8fff] to-transparent rounded-full mb-3 shadow-lg shadow-[#1d8fff]/30" />
          <div className="h-3 bg-gradient-to-r from-transparent via-[#1d8fff]/20 to-transparent rounded-full mb-3" />
          <p className="text-center text-[#1d8fff] font-semibold text-sm tracking-wider">
            SCREEN
          </p>
        </div>
      </div>

      {/* Seat Legend */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 p-4 bg-[#0a0e27] border border-[#1d8fff]/20 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#1d8fff]/10 border border-[#1d8fff]/30 rounded"></div>
          <span className="text-[#EEEEEE]/70 text-xs md:text-sm">
            Available
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#1d8fff] rounded shadow-md shadow-[#1d8fff]/50"></div>
          <span className="text-[#EEEEEE]/70 text-xs md:text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#EEEEEE]/20 border border-[#EEEEEE]/30 rounded"></div>
          <span className="text-[#EEEEEE]/70 text-xs md:text-sm">Locked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#EEEEEE]/10 border border-[#EEEEEE]/20 rounded opacity-50"></div>
          <span className="text-[#EEEEEE]/70 text-xs md:text-sm">Booked</span>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="space-y-2 md:space-y-3 overflow-x-auto pb-4">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={row}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: rowIndex * 0.05 }}
            className="flex items-center gap-2 md:gap-4 min-w-max"
          >
            {/* Row Label - Left */}
            <div className="w-6 md:w-8 text-center flex-shrink-0">
              <span className="text-[#1d8fff] font-bold text-sm md:text-base">
                {row}
              </span>
            </div>

            {/* Seats */}
            <div className="flex-1 grid grid-cols-12 gap-1.5 md:gap-2">
              {getSeatsByRow(row).map((seat, seatIndex) => {
                const isBooked = bookedSeats.includes(seat);
                const isLocked = lockedSeats.includes(seat);
                const isSelected = selected.includes(seat);

                // Add aisle gap after 6th seat
                const isAfterAisle = seatIndex === 13;

                return (
                  <motion.button
                    key={seat}
                    onClick={() => handleClick(seat)}
                    disabled={isBooked || isLocked}
                    whileHover={
                      !isBooked && !isLocked ? { scale: 1.1, y: -2 } : {}
                    }
                    whileTap={!isBooked && !isLocked ? { scale: 0.95 } : {}}
                    className={`
                      relative p-2 md:p-2.5 rounded-lg text-xs font-medium transition-all duration-200 aspect-square
                      ${isAfterAisle ? "ml-1 md:ml-2" : ""}
                      ${
                        isBooked
                          ? "bg-[#EEEEEE]/10 border border-[#EEEEEE]/20 cursor-not-allowed opacity-40"
                          : isLocked
                            ? "bg-[#EEEEEE]/20 border border-[#EEEEEE]/30 cursor-not-allowed opacity-60"
                            : isSelected
                              ? "bg-[#1d8fff] text-white shadow-lg shadow-[#1d8fff]/40 border border-[#1d8fff]"
                              : "bg-[#1d8fff]/10 border border-[#1d8fff]/30 text-[#EEEEEE]/70 hover:bg-[#1d8fff]/20 hover:border-[#1d8fff]/50 hover:text-[#EEEEEE]"
                      }
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <Armchair
                        size={14}
                        className={
                          isSelected
                            ? "text-white"
                            : isBooked || isLocked
                              ? "opacity-50"
                              : "text-[#1d8fff]"
                        }
                      />
                      <span className="mt-0.5 text-[10px] md:text-xs font-semibold">
                        {seat}
                      </span>
                    </div>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full shadow-md"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Row Label - Right */}
            <div className="w-6 md:w-8 text-center flex-shrink-0">
              <span className="text-[#1d8fff] font-bold text-sm md:text-base">
                {row}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Seats Summary */}
      {selected.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-5 md:p-6 bg-[#1d8fff]/10 border border-[#1d8fff]/30 rounded-xl"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#EEEEEE]/50 text-xs mb-1.5">Selected Seats</p>
              <p className="text-[#1d8fff] font-bold text-lg md:text-xl">
                {selected.join(", ")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#EEEEEE]/50 text-xs mb-1.5">Total Selected</p>
              <div className="flex items-center gap-2 justify-end">
                <div className="px-3 py-1.5 bg-[#1d8fff] rounded-lg">
                  <p className="text-white font-bold text-lg md:text-xl">
                    {selected.length}
                  </p>
                </div>
                <span className="text-[#EEEEEE]/70 text-sm">
                  {selected.length === 1 ? "seat" : "seats"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SeatGrid;