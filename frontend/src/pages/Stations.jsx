// pages/User/StationsPage.js

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StationsPage() {
  const [stations, setStations] = useState([]);

  // Search + Filters
  const [search, setSearch] = useState("");
  const [chargerFilter, setChargerFilter] = useState("All");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/stations`);

      setStations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Unique Charger Types
  const chargerTypes = [
    "All",
    ...new Set(stations.map((station) => station.chargerType)),
  ];

  // Filter + Search
  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const matchesSearch =
        station.stationName.toLowerCase().includes(search.toLowerCase()) ||
        station.chargerType.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        chargerFilter === "All" || station.chargerType === chargerFilter;

      return matchesSearch && matchesFilter;
    });
  }, [stations, search, chargerFilter]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold">EV Charging Stations</h1>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <input
            type="text"
            placeholder="Search station or charger type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none text-white w-full md:w-80"
          />

          {/* Filter */}
          <select
            value={chargerFilter}
            onChange={(e) => setChargerFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none text-white"
          >
            {chargerTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStations.length > 0 ? (
          filteredStations.map((station) => (
            <div
              key={station._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
            >
              <h2 className="text-2xl font-bold mb-4">{station.stationName}</h2>

              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="font-semibold text-white">
                    Charger Type:
                  </span>{" "}
                  {station.chargerType}
                </p>

                <p>
                  <span className="font-semibold text-white">Total Slots:</span>{" "}
                  {station.totalSlots}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Price Per Hour:
                  </span>{" "}
                  ₹{station.pricePerHour}
                </p>
              </div>

              <button
                onClick={() => navigate(`/station/${station._id}`)}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl font-semibold transition"
              >
                Book Slot
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-lg">No stations found</div>
        )}
      </div>
    </div>
  );
}

export default StationsPage;
