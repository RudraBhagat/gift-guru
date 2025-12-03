const axios = require("axios");

async function test() {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/recommend",
      {
        age: 25,
        gender: "Male",
        budget: 3000,
        occasion: "Birthday",
        relationship: "Friend",
        interests: "Sports, Tech"
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    console.log("Response:", JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error("❌ TEST ERROR:", err.response?.data || err.message);
  }
}

test();
