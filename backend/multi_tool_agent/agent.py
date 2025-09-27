# imports for the models
import os
import asyncio
from google.adk.agents import Agent
from google.adk.models.lite_llm import LiteLlm # For multi-model support
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types # For creating message Content/Parts
from google.adk.tools import google_search
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

# imports for timezones
import datetime
from zoneinfo import ZoneInfo

weather_finder = LlmAgent(
    name = "WeatherFinderAgent",
    model="gemini-2.5-flash",
    instruction="You are an agent that utilizes google search to find the weather of a location provided",
    tools=[google_search]
)



def get_budget(budget: int) -> dict:
    if(budget < 0):
        return {
            "status" : "error",
            "error_message": (
                f"budget cant be less than one"
            )
        }
    report = (f"Alright lets work with that")
    return {"status": "success", "report": report}


weather_finder_tool = AgentTool(agent=weather_finder)

root_agent = Agent(
    name="itinerary_time_agent",
    model="gemini-2.0-flash",
    description=(
        "Agent to help plan out an itenerary with a trip based on numerous inputs"
    ),
    instruction=(
        "You are a helpful agent that helps create an itenerary on the trip based on a budget, destination, and date. You may use google search to find the weather of that area"
    ),
    tools=[get_budget, weather_finder_tool],
)