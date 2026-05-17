import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { stationLogin } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function StationLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await stationLogin(formData);

      login(data);

      navigate("/station/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-2xl w-[400px]"
      >
        <h1 className="text-3xl font-bold text-green-400 mb-5">
          Station Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-slate-800 mb-4"
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
          className="w-full p-3 rounded-lg bg-slate-800 mb-4"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button className="w-full bg-green-500 py-3 rounded-lg">Login</button>
      </form>
    </div>
  );
}
export default StationLogin;
