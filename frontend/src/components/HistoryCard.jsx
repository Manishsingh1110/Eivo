function HistoryCard({ booking }) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-green-400">
            {booking.station}
          </h2>

          <p className="text-gray-400 mt-1">{booking.date}</p>
        </div>

        <div className="text-right">
          <p className="font-semibold">{booking.duration}</p>

          <p className="text-green-400">₹{booking.amount}</p>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
