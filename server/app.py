# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from agent import get_ai_advice
from salary_agent import get_ai_salary

app = Flask(__name__)
CORS(app)

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.json
    skills = data.get("skills", [])
    features = data.get("features", [0, 0])

    ai_salary = get_ai_salary(
        skills=", ".join(skills),
        experience=str(features[0])  # Assuming features[0] = experience
    )

    advice = get_ai_advice(", ".join(skills))

    return jsonify({
        "predicted_salary": ai_salary["predicted_salary"],
        "salary_range": ai_salary["salary_range"],
        "companies": ai_salary["companies"],
        "advice": advice
    })

if __name__ == "__main__":
    app.run(debug=True)
