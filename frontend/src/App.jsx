import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";

import UserLogin from "./pages/auth/UserLogin";
import UserRegister from "./pages/auth/UserRegister";
import StationLogin from "./pages/auth/StationLogin";
import StationRegister from "./pages/auth/StationRegister";
import NearbyStations from "./pages/user/NearbyStations";
import BookingHistory from "./pages/bookings/BookingHistory";
import StationDashboard from "./pages/station/StationDashboard";
import Stations from "./pages/Stations";
import StationDetails from "./pages/StationDetails";
import MapScreen from "./pages/MapScreen";
import BookingPage from "./pages/User/BookingPage";
import MyBookingsPage from "./pages/User/MyBookingsPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkToken);

    checkToken();

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Navbar */}
        <Navbar />

        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Navigate to="/user/login" />} />
          <Route path="/station/:id" element={<StationDetails />} />
          <Route path="/booking/:stationId" element={<BookingPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          {/* Auth Routes */}
          <Route path="/user/login" element={<UserLogin />} />

          <Route path="/user/register" element={<UserRegister />} />

          <Route path="/station/login" element={<StationLogin />} />

          <Route path="/station/register" element={<StationRegister />} />

          {/* Protected Routes */}

          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/allstation" element={<Stations />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/station/dashboard"
            element={
              <ProtectedRoute role="station">
                <StationDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
