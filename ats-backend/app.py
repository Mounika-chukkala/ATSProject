# ats-backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import os
from dotenv import load_dotenv

from utils.parser import extract_text_from_pdf
from utils.analyzer import evaluate_resume, match_resume

# Load .env variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise Exception("⚠️ MONGO_URI not found in environment variables.")

client = MongoClient(MONGO_URI)
db = client["ats_db"]
users_collection = db["users"]

@app.route("/api/test-insert", methods=["GET"])
def test_insert():
    users_collection.insert_one({"name": "Mounika", "email": "mounika@example.com"})
    return jsonify({"message": "Inserted!"})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"success": False, "message": "User already exists"}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({"email": email, "password": hashed_pw})
    return jsonify({"success": True, "message": "User registered successfully"}), 200

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    stored_password = user.get('password')

    if stored_password and bcrypt.checkpw(password.encode('utf-8'), stored_password):
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

@app.route("/evaluate", methods=["POST"])
def evaluate():
    print("✅ /evaluate route hit")
    print("Received data:", request.form)

    resume = request.files.get("resume")
    job_desc = request.form.get("job_description")

    if not resume or not job_desc:
        return jsonify({"error": "Missing file or job description"}), 400

    text = extract_text_from_pdf(resume)
    analysis = evaluate_resume(text, job_desc)

    return jsonify({"response": analysis})

@app.route("/match_percentage", methods=["POST"])
def match():
    resume = request.files.get("resume")
    job_desc = request.form.get("job_description")

    if not resume or not job_desc:
        return jsonify({"error": "Missing file or job description"}), 400

    text = extract_text_from_pdf(resume)
    result = match_resume(text, job_desc)

    return jsonify({"response": result})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
