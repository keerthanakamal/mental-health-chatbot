from flask import Flask, request, jsonify, render_template
import openai
import os
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # ✅ New client object

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/ask', methods=['POST'])
def ask():
    user_msg = request.json.get("message", "")

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                { "role": "system", "content": "You are a kind and empathetic mental health assistant. Respond with compassion and encouragement." },
                { "role": "user", "content": user_msg }
            ]
        )
        reply = response.choices[0].message.content
        return jsonify({ "reply": reply })

    except Exception as e:
        print("OpenAI API Error:", e)
        return jsonify({ "reply": "Oops, something went wrong!" })

if __name__ == '__main__':
    app.run(debug=True)
