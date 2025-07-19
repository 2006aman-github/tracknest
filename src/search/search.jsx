import React, { useState } from "react";
import { Input } from "@/components/ui/input.jsx";
import { extractSkills } from "@/app/useGeminiExtractor.js";

function Search() {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle search (calls Gemini API)
  const handleSearch = async () => {
    if (!search.trim()) {
      setError("Please enter some text to search.");
      return;
    }
    setLoading(true);
    setError(null);
    setSkills([]);

    try {
      const extracted = await extractSkills(search);
      setSkills(extracted);
    } catch (e) {
      setError(e.message || "Failed to extract skills.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 w-full max-w-lg mx-auto">
      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          type="search"
          placeholder="Search Courses or Skills"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* Extracted Skills */}
      {skills.length > 0 && (
        <div className="mt-4 bg-gray-50 p-3 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Extracted Skills:</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
