import HistoryCard from "../components/HistoryCard";

function History() {
  const bookings = [
    {
      id: 1,
      station: "Tesla EV Station",
      date: "12 May 2026",
      duration: "45 mins",
      amount: 450,
    },
    {
      id: 2,
      station: "Charge Hub",
      date: "10 May 2026",
      duration: "30 mins",
      amount: 300,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold text-green-400 mb-8">
        Booking History
      </h1>

      <div className="space-y-5">
        {bookings.map((booking) => (
          <HistoryCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default History;
