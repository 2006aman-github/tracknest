export async function extractSkills(query) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const body = {
    contents: [
      {
        parts: [
          { text: `Extract technical skills or keywords from the following text and return them as a JSON array.
          Text: "${query}".
          Example: ["Python", "React", "Machine Learning"]` },
        ],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${errorText}`);
    }

    const data = await response.json();
    console.log("Gemini Response:", data);  // Debug response

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Try parsing JSON array
    try {
      return JSON.parse(text);
    } catch {
      return [text];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
