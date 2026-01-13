import os
import uuid
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime

# ===== Optional: OpenAI / Azure OpenAI SDK =====
# from openai import OpenAI
# client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI(
    title="Agentic AI – Ticket & Logistics Automation",
    description="Autonomous AI agent for transportation and logistics ticket handling",
    version="1.0.0"
)

# =====================
# In-Memory Store (Replace with Redis/DB in production)
# =====================
AGENT_MEMORY: Dict[str, Dict[str, Any]] = {}

# =====================
# Request & Response Models
# =====================
class TicketRequest(BaseModel):
    customer_id: str
    issue_type: str
    description: str
    priority: str = "normal"

class AgentResponse(BaseModel):
    ticket_id: str
    action_plan: list
    status: str
    timestamp: datetime

# =====================
# TOOL FUNCTIONS (AGENT CAPABILITIES)
# =====================
def check_route_availability(payload: dict) -> dict:
    return {
        "tool": "route_availability",
        "result": "Alternative route available via Lagos → Ibadan → Abuja",
    }

def rebook_transport(payload: dict) -> dict:
    return {
        "tool": "rebook_transport",
        "result": "Ticket rebooked with 10% discount applied",
    }

def notify_customer(payload: dict) -> dict:
    return {
        "tool": "customer_notification",
        "result": "Customer notified via email and SMS",
    }

TOOLS = {
    "route_check": check_route_availability,
    "rebook": rebook_transport,
    "notify": notify_customer,
}

# =====================
# AGENT REASONING ENGINE
# =====================
def agent_planner(ticket: TicketRequest) -> list:
    """
    Simple rule-based planner.
    Replace with LLM-based planner for deeper reasoning.
    """
    plan = []

    if "delay" in ticket.description.lower():
        plan.append("route_check")
        plan.append("rebook")
        plan.append("notify")

    elif "cancel" in ticket.description.lower():
        plan.append("rebook")
        plan.append("notify")

    else:
        plan.append("notify")

    return plan

# =====================
# AGENT EXECUTOR
# =====================
def execute_plan(plan: list, payload: dict) -> list:
    results = []

    for step in plan:
        tool = TOOLS.get(step)
        if tool:
            results.append(tool(payload))

    return results

# =====================
# API ENDPOINT
# =====================
@app.post("/agent/ticket", response_model=AgentResponse)
def handle_ticket(ticket: TicketRequest):
    ticket_id = str(uuid.uuid4())

    # Step 1: Plan
    action_plan = agent_planner(ticket)

    # Step 2: Execute
    execution_results = execute_plan(action_plan, ticket.dict())

    # Step 3: Persist Memory
    AGENT_MEMORY[ticket_id] = {
        "ticket": ticket.dict(),
        "plan": action_plan,
        "results": execution_results,
        "created_at": datetime.utcnow().isoformat(),
    }

    return AgentResponse(
        ticket_id=ticket_id,
        action_plan=execution_results,
        status="completed",
        timestamp=datetime.utcnow(),
    )

# =====================
# Health Check
# =====================
@app.get("/health")
def health():
    return {"status": "ok"}

