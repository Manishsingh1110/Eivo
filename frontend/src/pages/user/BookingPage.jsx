// pages/User/BookingPage.js

import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { createBooking } from "../../services/bookingService";

import { AuthContext } from "../../context/AuthContext";

function BookingPage() {
  const { stationId } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    bookingDate: "",
    startHour: "",
    endHour: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createBooking(
        {
          stationId,
          bookingDate: formData.bookingDate,
          startHour: Number(formData.startHour),
          endHour: Number(formData.endHour),
        },
        user.token,
      );

      alert("Booking Successful");

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border p-6 rounded-2xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6">Book Charging Slot</h1>

        <div className="mb-4">
          <label>Date</label>

          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl mt-1"
          />
        </div>

        <div className="mb-4">
          <label>Start Hour</label>

          <input
            type="number"
            name="startHour"
            min="0"
            max="23"
            value={formData.startHour}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl mt-1"
          />
        </div>

        <div className="mb-4">
          <label>End Hour</label>

          <input
            type="number"
            name="endHour"
            min="1"
            max="24"
            value={formData.endHour}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-xl mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
