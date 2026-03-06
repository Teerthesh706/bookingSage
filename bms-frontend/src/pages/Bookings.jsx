import { useEffect, useState } from "react";
import API from "../apis";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await API.get("/bookings/my-bookings");
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.map((booking) => (
        <div key={booking._id} className="bg-[#1c1c1c] p-6 rounded mb-4">
          <h3 className="text-xl font-semibold">{booking.show.movie.title}</h3>
          <p>{booking.show.theater.name}</p>
          <p>Seats: {booking.seats.join(", ")}</p>
          <p>Total: ₹{booking.totalAmount}</p>
          <p>Show Time: {new Date(booking.show.showTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
