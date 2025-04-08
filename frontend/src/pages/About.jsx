import React from 'react'
import { Link } from "react-router-dom";
function About() {
  return (
<div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 flex flex-col items-center justify-start px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">About Resumetrics</h1>
      <p className="text-lg max-w-3xl text-center mb-8 leading-relaxed">
        <span className="font-semibold text-blue-700">Resumetrics</span> is an intelligent Applicant Tracking System (ATS) designed to streamline your recruitment process.
        With powerful resume parsing, skill matching, and automated scoring, it helps recruiters identify top candidates faster.
      </p>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">🚀 Key Features</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Resume Upload & Parsing</li>
            <li>Smart Skill Matching</li>
            <li>PDF Text Extraction</li>
            <li>Match Percentage Evaluation</li>
            <li>Secure User Auth with Firebase</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">🎯 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to simplify the hiring process by providing recruiters and job seekers with tools that make resume evaluation more efficient, fair, and data-driven.
            With Resumetrics, we bridge the gap between talent and opportunity.
          </p>
        </div>
      </div>

      <Link to="/dashboard">
        <button className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition duration-300">
          Back to Dashboard
        </button>
      </Link>
    </div>

  )
}

export default About
