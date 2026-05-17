import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Get User Details
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    // Remove stored data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login
    navigate("/user/login");

    // Refresh navbar state
    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-green-400">EV Charge</h1>

      {/* If Logged In */}
      {token ? (
        <div className="flex items-center gap-6">
          <Link to="/map" className="hover:text-green-400 transition">
            Map
          </Link>

          <Link to="/allstation" className="hover:text-green-400 transition">
            Stations
          </Link>

          <Link to="/bookings" className="hover:text-green-400 transition">
            Bookings
          </Link>

          {/* User Details */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-300 font-medium">
                {user?.name || "User"}
              </p>
            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        /* If Not Logged In */
        <div className="flex items-center gap-4">
          <Link
            to="/user/login"
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition"
          >
            User Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
