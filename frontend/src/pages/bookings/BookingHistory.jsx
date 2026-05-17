import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${BASE_URL}/api/bookings/my-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-8">
        Booking History
      </h1>

      <div className="grid gap-5">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800"
          >
            {/* Station Name */}
            <h2 className="text-2xl font-bold text-white mb-4">
              {booking.station?.stationName}
            </h2>

            {/* Station Details */}
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold text-white">Charger Type:</span>{" "}
                {booking.station?.chargerType}
              </p>

              <p>
                <span className="font-semibold text-white">Total Slots:</span>{" "}
                {booking.station?.totalSlots}
              </p>

              <p>
                <span className="font-semibold text-white">Booking Date:</span>{" "}
                {booking.bookingDate}
              </p>

              <p>
                <span className="font-semibold text-white">Time:</span>{" "}
                {booking.startTime} - {booking.endTime}
              </p>

              <p>
                <span className="font-semibold text-white">Slot Number:</span>{" "}
                {booking.slotNumber}
              </p>

              <p>
                <span className="font-semibold text-white">Total Amount:</span>{" "}
                ₹{booking.totalAmount}
              </p>

              <p>
                <span className="font-semibold text-white">Status:</span>{" "}
                <span className="text-green-400 capitalize">
                  {booking.status}
                </span>
              </p>

              <p>
                <span className="font-semibold text-white">Booked On:</span>{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingHistory;
