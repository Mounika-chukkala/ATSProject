import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load .env variables
load_dotenv()

# Configure the Gemini API key
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use a supported model (you have gemini-1.5-pro-latest!)
model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")

response = model.generate_content("Say hi to Mounika and wish her all the best for her ATS project!")
print(response.text)
