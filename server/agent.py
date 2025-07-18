# agent.py
import os
from dotenv import load_dotenv
import google.generativeai as genai
from typing import TypedDict
from langgraph.graph import StateGraph
from langchain_core.messages import HumanMessage

# Load API key from .env
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Gemini model setup
model = genai.GenerativeModel("gemini-1.5-flash", generation_config={"temperature": 0.7})

# LangGraph state definition
class AdviceState(TypedDict):
    user_input: str
    advice: str

# Node function to generate career advice
def generate_advice(state: AdviceState) -> AdviceState:
    user_input = state["user_input"]
    message = HumanMessage(
        content=f"""
You are advising a freelancer or fresher with skills in: {user_input}.

Give 5 **short and practical tips** for job hunting or freelancing success related to these skills.

🔹 Format as a numbered list.  
🔹 Tips should be simple, actionable, and beginner-friendly.

Example:
1. Showcase your projects in a portfolio or GitHub profile.
2. Apply regularly to freelance platforms like Upwork and Fiverr.

Make sure your advice is realistic and helpful.
"""
    )

    response = model.generate_content(message.content)
    clean_text = response.text.strip().replace("**", "")
    return {"user_input": user_input, "advice": clean_text}

# LangGraph setup and invocation
def get_ai_advice(user_input: str) -> str:
    builder = StateGraph(state_schema=AdviceState)
    builder.add_node("advice", generate_advice)
    builder.set_entry_point("advice")
    builder.set_finish_point("advice")
    graph = builder.compile()
    result = graph.invoke({"user_input": user_input})
    return result["advice"]
