// pages/User/MyBookingsPage.js

import { useEffect, useState, useContext } from "react";

import { getMyBookings } from "../../services/bookingService";

import { AuthContext } from "../../context/AuthContext";

function MyBookingsPage() {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings(user.token);

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid gap-5">
        {bookings.map((booking) => (
          <div key={booking._id} className="border p-5 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold">
              {booking.station?.stationName}
            </h2>

            <p>Date: {booking.bookingDate}</p>

            <p>
              Time: {booking.startHour}:00 - {booking.endHour}:00
            </p>

            <p>Slot Number: {booking.slotNumber}</p>

            <p>Amount: ₹{booking.totalAmount}</p>

            <p>Status: {booking.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookingsPage;
