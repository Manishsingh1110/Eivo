import { useEffect, useState } from "react";
import { getStations } from "../../services/stationService";
import StationCard from "../../components/cards/StationCard";

function NearbyStations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const { data } = await getStations();

      setStations(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-green-400 mb-8">
        Nearby Charging Stations
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stations.map((station) => (
          <StationCard key={station._id} station={station} />
        ))}
      </div>
    </div>
  );
}

export default NearbyStations;
