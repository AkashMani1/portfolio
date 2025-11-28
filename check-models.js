// check-models.js
// Run this with: node check-models.js
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ No API Key found in .env.local");
  process.exit(1);
}

console.log("Checking available models for your API key...");

fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
        console.error("❌ API Error:", data.error.message);
    } else {
        console.log("✅ Available Models:");
        // Filter for only generateContent supported models
        const models = data.models
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));
        console.log(models.join("\n"));
    }
  })
  .catch(err => console.error("❌ Network Error:", err));