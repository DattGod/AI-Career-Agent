# salary_agent.py
import os
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_core.messages import HumanMessage
from langgraph.graph import StateGraph
from typing import TypedDict

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Use Gemini Flash model
model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"temperature": 0.7})

class SalaryState(TypedDict):
    skills: str
    experience: str
    salary_range: str
    predicted_salary: float
    companies: str

def generate_salary_info(state: SalaryState) -> SalaryState:
    skills = state["skills"]
    experience = state["experience"]

    prompt = f"""
    Based on the following details:
    - Skills: {skills}
    - Experience: {experience} years

    Estimate a fair **monthly salary range** in INR for a job or freelance project.
    If the person is a fresher (0 years), consider a realistic entry-level salary.

    👉 Return only two numbers separated by a hyphen with no symbols or text.
    ❌ Do not return 0 unless it's absolutely valid.
    ✅ Example format: 12000-18000
    """

    response = model.generate_content(prompt)
    raw_range = response.text.strip()

    # Extract average
    try:
        parts = raw_range.replace(" ", "").split("-")
        low = int(parts[0])
        high = int(parts[1])
        avg = (low + high) / 2
        cleaned_range = f"{low}-{high}"
    except:
        cleaned_range = "10000-15000"
        avg = 12500

    # Company suggestion
    company_prompt = f"""
    Suggest 3 Indian companies or freelance platforms that often hire people with skills in {skills}.
    Provide them as a comma-separated list without extra description.
    """
    company_resp = model.generate_content(company_prompt)
    companies = company_resp.text.strip().replace("\n", ", ").strip()

    return {
        "skills": skills,
        "experience": experience,
        "salary_range": cleaned_range,
        "predicted_salary": round(avg, 2),
        "companies": companies
    }

def get_ai_salary(skills: str, experience: str) -> dict:
    builder = StateGraph(state_schema=SalaryState)
    builder.add_node("salary", generate_salary_info)
    builder.set_entry_point("salary")
    builder.set_finish_point("salary")
    graph = builder.compile()
    result = graph.invoke({"skills": skills, "experience": experience})
    return result
