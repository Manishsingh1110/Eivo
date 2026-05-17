import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { stationRegister } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function StationRegister() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    stationName: "",
    email: "",
    password: "",
    latitude: "",
    longitude: "",
    chargerType: "",
    totalSlots: "",
    availableSlots: "",
    pricePerHour: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await stationRegister(formData);

      login(data);

      navigate("/station/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-green-400 mb-5">
          Station Register
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Station Name"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                stationName: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Latitude"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                latitude: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Longitude"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                longitude: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Total Slots"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                totalSlots: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Available Slots"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                availableSlots: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Price Per Hour"
            className="p-3 rounded-lg bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                pricePerHour: e.target.value,
              })
            }
          />
        </div>

        <select
          className="w-full p-3 rounded-lg bg-slate-800 mt-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              chargerType: e.target.value,
            })
          }
        >
          <option value="">Select Charger Type</option>
          <option value="AC">AC</option>
          <option value="DC">DC</option>
        </select>

        <button className="w-full bg-green-500 py-3 rounded-lg mt-5">
          Register Station
        </button>
      </form>
    </div>
  );
}

export default StationRegister;
