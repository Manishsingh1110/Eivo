function StationDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-green-400">Station Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2>Total Bookings</h2>
          <p className="text-4xl font-bold mt-2">25</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2>Available Slots</h2>
          <p className="text-4xl font-bold mt-2">8</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl">
          <h2>Revenue</h2>
          <p className="text-4xl font-bold mt-2">₹12K</p>
        </div>
      </div>
    </div>
  );
}

export default StationDashboard;
