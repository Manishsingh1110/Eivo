import { useNavigate } from "react-router-dom";

function StationCard({ station }) {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
      <h2 className="text-xl font-bold text-green-400">
        {station.stationName}
      </h2>

      <p className="mt-2 text-gray-400">Charger: {station.chargerType}</p>

      <p className="text-gray-400">Slots: {station.availableSlots}</p>

      <p className="text-gray-400">₹{station.pricePerHour}/hour</p>

      <button
        onClick={() => navigate(`/station/${station._id}`)}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
      >
        View Station
      </button>
    </div>
  );
}

export default StationCard;
