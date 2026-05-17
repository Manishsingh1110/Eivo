import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function StationDetails() {
  const { id } = useParams();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [station, setStation] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    slot: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStation();
  }, []);

  const fetchStation = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/stations/${id}`);

      setStation(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log(token);
      // Generate end time automatically (+30 mins)
      const [hours, minutes] = formData.startTime.split(":").map(Number);

      let endHour = hours;
      let endMinute = minutes + 30;

      if (endMinute >= 60) {
        endMinute = 0;
        endHour += 1;
      }

      if (endHour >= 24) {
        endHour = 0;
      }

      const endTime = `${String(endHour).padStart(2, "0")}:${String(
        endMinute,
      ).padStart(2, "0")}`;

      await axios.post(
        `${BASE_URL}/api/bookings/`,
        {
          stationId: id,
          bookingDate: formData.bookingDate,
          startTime: formData.startTime,
          endTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Booking Successful");

      setFormData({
        bookingDate: "",
        startTime: "",
      });
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Booking Failed");
    } finally {
      setLoading(false);
    }
  };

  // 30 min time slots
  const generateTimeSlots = () => {
    const slots = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const h = String(hour).padStart(2, "0");
        const m = String(min).padStart(2, "0");

        slots.push(`${h}:${m}`);
      }
    }

    return slots;
  };

  if (!station) {
    return (
      <div className="h-screen flex items-center justify-center text-black text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Station Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-black">
            {station.stationName}
          </h1>

          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <span className="font-semibold">Charger Type:</span>{" "}
              {station.chargerType}
            </p>

            <p>
              <span className="font-semibold">Available Slots:</span>{" "}
              {station.totalSlots}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Book Charging Slot
          </h2>

          <form onSubmit={handleBooking} className="space-y-5">
            {/* Date */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Select Date
              </label>

              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 text-black outline-none focus:border-green-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Select Time
              </label>

              <select
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 text-black outline-none focus:border-green-500"
              >
                <option value="">Select Time</option>

                {generateTimeSlots().map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Slot */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Select Slot
              </label>

              <select
                name="slot"
                value={formData.slot}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl p-3 text-black outline-none focus:border-green-500"
              >
                <option value="">Select Slot</option>

                {[...Array(station.totalSlots || 1)].map((_, index) => (
                  <option key={index} value={index + 1}>
                    Slot {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StationDetails;
