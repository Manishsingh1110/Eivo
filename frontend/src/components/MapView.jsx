import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Default Marker Fix
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Red Marker for Current Location
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Auto Center Map
function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);

  return null;
}

function MapView({ stations }) {
  const navigate = useNavigate();

  const [currentLocation, setCurrentLocation] = useState(null);

  // Get User Current Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <div className="h-[80vh] w-full rounded-2xl overflow-hidden">
      <MapContainer
        center={[19.076, 72.8777]}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current Location */}
        {currentLocation && (
          <>
            <ChangeMapView center={currentLocation} />

            <Marker position={currentLocation} icon={redIcon}>
              <Popup>
                <div>
                  <h2 className="font-bold text-red-500">
                    Your Current Location
                  </h2>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Stations */}
        {stations.map((station) => (
          <Marker
            key={station._id}
            position={[station.latitude, station.longitude]}
          >
            <Popup>
              <div className="min-w-[220px]">
                <h2 className="font-bold text-lg mb-2">
                  {station.stationName}
                </h2>

                <p className="mb-1">
                  <span className="font-semibold">Charger:</span>{" "}
                  {station.chargerType}
                </p>

                <p className="mb-1">
                  <span className="font-semibold">Slots:</span>{" "}
                  {station.totalSlots}
                </p>

                <p className="mb-3">
                  <span className="font-semibold">Price:</span> ₹
                  {station.pricePerHour}/hour
                </p>

                <button
                  onClick={() => navigate(`/station/${station._id}`)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                >
                  View Station
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
