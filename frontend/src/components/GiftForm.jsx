import React, { useState } from "react";
import axios from "axios";

export default function GiftForm() {
  const [form, setForm] = useState({
    age: "",
    gender: "Male",
    budget: "",
    occasion: "",
    relationship: "",
    interests: "",
  });

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    setLoading(true);
    setErrorMsg("");
    setRecommendations([]);

    try {
      const res = await axios.post("http://localhost:5000/api/recommend", form);

      if (!res.data.success) {
        setErrorMsg(res.data.message || "Something went wrong");
        return;
      }

      setRecommendations(res.data.recommendations);
    } catch (err) {
      setErrorMsg("Server error. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <input
          name="age"
          type="number"
          placeholder="Age"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <select
          name="gender"
          className="border p-3 rounded"
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="budget"
          type="number"
          placeholder="Budget"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="occasion"
          placeholder="Occasion (Birthday, Anniversary...)"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="relationship"
          placeholder="Relationship (Friend, Sister...)"
          className="border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="interests"
          placeholder="Interests (Sports, Music...)"
          className="border p-3 rounded"
          onChange={handleChange}
        />
      </div>

      <button
        onClick={submitForm}
        disabled={loading}
        className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold"
      >
        {loading ? "Generating..." : "Get Recommendations"}
      </button>

      {errorMsg && (
        <p className="text-red-600 mt-4 text-center">{errorMsg}</p>
      )}

      {/* RESULTS */}
      <div className="mt-10">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="border p-5 rounded-lg shadow mb-5 bg-gray-50"
          >
            <h3 className="text-xl font-bold">{item.product_name || item.error}</h3>

            {item.image_url && (
              <img
                src={item.image_url}
                alt=""
                className="w-40 mt-3 rounded"
              />
            )}

            {item.price && <p className="mt-2">💰 Price: {item.price}</p>}

            {item.why_recommended && (
              <p className="mt-2 text-gray-600">{item.why_recommended}</p>
            )}

            {item.shopping_link && (
              <a
                href={item.shopping_link}
                target="_blank"
                className="text-blue-600 underline mt-2 inline-block"
              >
                Buy Now
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
