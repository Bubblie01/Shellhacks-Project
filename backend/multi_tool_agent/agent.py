import datetime
from zoneinfo import ZoneInfo
from google.adk.agents import Agent

def get_budget(budget: int) -> dict:
    if(budget < 0):
        return {
            "status" : "error",
            "error_message": (
                f"budget cant be less than one"
            )
        }

root_agent = Agent(
    name="itinerary_time_agent",
    model="gemini-2.0-flash",
    description=(
        "Agent to help plan out an itenerary with a trip based on numerous inputs"
    ),
    instruction=(
        "You are a helpful agent that helps create an itenerary on the trip based on a budget, destination, date, and weather"
    ),
    tools=[get_budget],
)