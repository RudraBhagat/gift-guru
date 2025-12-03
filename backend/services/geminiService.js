require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateGiftRecommendation(userData) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
You are an expert AI gift recommender.

User Info:
Age: ${userData.age}
Gender: ${userData.gender}
Budget: ${userData.budget}
Occasion: ${userData.occasion}
Relationship: ${userData.relationship}
Interests: ${userData.interests || "not provided"}

RULES:
1. Output STRICTLY valid JSON.
2. NO text outside JSON. NO explanations. NO markdown. NO comments.
3. JSON must be ONLY an array of EXACTLY 5 objects.
4. Each object must look like this:

[
  {
    "product_name": "string",
    "price": "string",
    "shopping_link": "string",
    "image_url": "string",
    "why_recommended": "string"
  }
]

Only output valid JSON. Nothing else.
`;

    const result = await model.generateContent(prompt);
    const output = result.response.text();

    // -------- CLEAN THE RESPONSE --------
    let clean = output
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract ONLY the JSON array if additional text exists
    const jsonMatch = clean.match(/\[[\s\S]*\]/);
    if (jsonMatch) clean = jsonMatch[0];

    // -------- PARSE JSON SAFELY --------
    try {
      return JSON.parse(clean);
    } catch (err) {
      console.log("❗ Gemini output (invalid JSON):", output);
      return [{ error: "Invalid JSON returned by Gemini", raw: output }];
    }
  } catch (err) {
    console.error("🔥 GEMINI API ERROR:", err);
    return [{ error: err.message }];
  }
}

module.exports = { generateGiftRecommendation };
