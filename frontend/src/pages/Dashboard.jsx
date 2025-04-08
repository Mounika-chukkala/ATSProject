import { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';
export default function Dashboard() {
  const [jobDescription, setJobDescription] = useState("");
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (endpoint) => {
    console.log("🔥 Button clicked:", endpoint);
    if (!file) {
      alert("Please upload a resume");
      return;
    }
    const formData = new FormData();
    formData.append("job_description", jobDescription);
    formData.append("resume", file);

    try {
      setIsLoading(true);
      const res = await axios.post(`http://localhost:8000/${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Response:", res.data);
      setResponse(res.data.response);
    } catch (error) {
      setResponse("❌ Error processing request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-8">ResuMetrics</h1>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <button
            onClick={() => handleSubmit("evaluate")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-all duration-200"
          >
            🧠 Analyze Resume
          </button>
          <button
            onClick={() => handleSubmit("match_percentage")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-all duration-200"
          >
            📊 Check Match %
          </button>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500 text-lg">⏳ Processing...</div>
        ) : (
          response && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">🔍 Response:</h2> 
              { response.summary?
              <p className="text-gray-700"><ReactMarkdown>
                {response.summary}
                </ReactMarkdown></p>:
              <p className="text-gray-700">
                <ReactMarkdown>
                {response.match_report}
                </ReactMarkdown>
                </p>

            }
            </div>
          )
        )}
      </div>
    </div>
  );
}
