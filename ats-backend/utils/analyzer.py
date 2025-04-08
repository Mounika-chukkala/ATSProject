# ats-backend/utils/analyzer.py

import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load API key from .env
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("No GEMINI_API_KEY found in .env")

# Configure Gemini
genai.configure(api_key=api_key)

# Use proper model name
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

def evaluate_resume(resume_text, job_description):
    prompt = f"""
    Evaluate the following resume for the given job description.
    Give a short summary and suggest improvements.

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"❌ Error: {str(e)}"

def match_resume(resume_text, job_description):
    prompt = f"""
    Based on this resume and job description, give a match percentage and a short explanation.

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"❌ Error: {str(e)}"
