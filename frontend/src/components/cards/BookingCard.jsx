function BookingCard({ booking }) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <h2 className="text-xl font-bold text-green-400">
        {booking.stationId?.stationName}
      </h2>

      <p className="mt-2 text-gray-400">Date: {booking.bookingDate}</p>

      <p className="text-gray-400">Time: {booking.bookingTime}</p>

      <p className="text-gray-400">Status: {booking.status}</p>
    </div>
  );
}

export default BookingCard;
