# ats-backend/utils/analyzer.py

from google.generativeai import GenerativeModel
import google.generativeai as genai
from dotenv import load_dotenv  # 👈 Required to load .env
import os

load_dotenv()  # 👈 This loads the .env file

# Now get the key
key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key)  # 🔑 Replace this
model = GenerativeModel("gemini-1.5-flash")


def evaluate_resume(resume_text):
    prompt = f"""
You are a resume analysis assistant. Summarize the following resume, highlighting the candidate's:
- Skills
- Education
- Experience
- Projects (if any)
Return the summary in clear bullet points.

Resume:
{resume_text}
"""

    try:
        response = model.generate_content(prompt)
        return {
            "summary": response.text,
            "source": "Gemini AI"
        }

    except Exception as e:
        print("🔥 Error in evaluate_resume:", e)
        return {"error": str(e)}


def match_resume(resume_text, job_description):
    prompt = f"""
Compare the following resume with the job description and provide:
1. Match Percentage
2. Strengths
3. Suggestions for Improvement

Return in a good visually appealing format.

Resume:
{resume_text}

Job Description:
{job_description}
"""

    try:
        response = model.generate_content(prompt)
        return {
            "match_report": response.text,
            "source": "Gemini AI"
        }

    except Exception as e:
        print("🔥 Error in match_resume:", e)
        return {"error": str(e)}
