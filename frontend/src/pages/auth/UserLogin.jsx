import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";

function UserLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/map");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await userLogin(formData);

      // Store token
      localStorage.setItem("token", data.token);

      // Store user/station data if needed
      localStorage.setItem("user", JSON.stringify(data));

      login(data);

      navigate("/map");
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
        <h1 className="text-3xl font-bold text-green-400 mb-5">User Login</h1>

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

        <button className="w-full bg-green-500 py-3 rounded-lg text-white font-semibold">
          Login
        </button>

        {/* Signup Redirect */}
        <div className="mt-5 text-center">
          <p className="text-slate-400 mb-2">Don&apos;t have an account?</p>

          <button
            type="button"
            onClick={() => navigate("/user/register")}
            className="w-full border border-green-500 text-green-400 py-3 rounded-lg hover:bg-green-500 hover:text-white transition"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
