import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleModel: "",
    batteryPercentage: "",
    chargerType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("User Information Saved");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-8 rounded-2xl shadow-lg space-y-5"
    >
      <h2 className="text-3xl font-bold text-green-400">
        Personal Information
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />

      <input
        type="text"
        name="vehicleModel"
        placeholder="Vehicle Model"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />

      <input
        type="number"
        name="batteryPercentage"
        placeholder="Battery Percentage"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      />

      <select
        name="chargerType"
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 outline-none"
      >
        <option value="">Select Charger Type</option>
        <option value="AC">AC Charger</option>
        <option value="DC">DC Fast Charger</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-3 rounded-lg font-semibold"
      >
        Save Information
      </button>
    </form>
  );
}

export default UserForm;
