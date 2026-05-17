import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userRegister } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function UserRegister() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    vehicleModel: "",
    chargerType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await userRegister(formData);

      login(data);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-slate-900 p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-green-400 mb-2">
          Create Account
        </h1>

        <p className="text-slate-400 mb-6">
          Register to find EV charging stations nearby.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Full Name"
            className="p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-green-500"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            className="p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-green-500"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            className="p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-green-500"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            className="p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-green-500"
            onChange={handleChange}
          />

          <input
            type="text"
            name="vehicleModel"
            value={formData.vehicleModel}
            placeholder="Vehicle Model"
            className="p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-green-500"
            onChange={handleChange}
          />

          <select
            name="chargerType"
            value={formData.chargerType}
            className="p-3 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-green-500"
            onChange={handleChange}
          >
            <option value="">Select Charger Type</option>
            <option value="AC">AC</option>
            <option value="DC">DC</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-3 rounded-lg mt-6 font-semibold text-white"
        >
          Register
        </button>

        <p className="text-center text-slate-400 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:text-green-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default UserRegister;
