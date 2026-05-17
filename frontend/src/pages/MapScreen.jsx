import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapView from "../components/MapView";
import { getStations } from "../services/stationService";

function MapScreen() {
  const [stations, setStations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/station/login");
      return;
    }

    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const { data } = await getStations();

      setStations(data);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("station");

        navigate("/station/login");
      }
    }
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-4xl font-bold text-green-400">
          Nearby Charging Stations
        </h1>

        <p className="text-gray-400 mt-2">
          Find EV charging stations near your location.
        </p>
      </div>

      {/* Pass stations to map */}
      <MapView stations={stations} />
    </div>
  );
}

export default MapScreen;
