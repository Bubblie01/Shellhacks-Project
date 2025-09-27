# imports for the models
import os
import asyncio
from google.adk.agents import Agent
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types # For creating message Content/Parts
from google.adk.tools import google_search
from google.adk.agents import LlmAgent
from google.adk.agents.remote_a2a_agent import RemoteA2aAgent
from google.adk.tools.agent_tool import AgentTool

# imports for timezones
import datetime
from zoneinfo import ZoneInfo

# sub agent to find the weather, given a location.
weather_finder = LlmAgent(
    name = "WeatherFinderAgent",
    model = "gemini-2.5-flash",
    instruction = "You are an agent that utilizes google search "
                  "to find the weather of a location provided. "
                  "Do not search for any other material than "
                  "the weather at the location provided.",
    tools=[google_search]
)

# save URL of the location agent server so it can be called upon when needed.
location_agent_card_url = os.getenv("LOCATION_AGENT_URL")

# caller agent to communicate with the location agent
caller_agent = RemoteA2aAgent(
    name = "callerAgent",
    description = "The agent responsible for handling all " 
                  "information related to the location provided.",
    agent_card = location_agent_card_url
)


def get_budget(budget: int) -> dict:
    """Check budget to verify it is not a negative number.

    Args:
        budget (int): value of the user's budget they provided

    Returns:
        dict:   A dictionary containing the budget information.
                Includes a "status" key ("success" or "error").
                If 'success', includes a 'report' key clarifying we can work with the value.
                If 'error', includes an 'error_message' key.
    
    """
    if(budget < 0):
        return {
            "status" : "error",
            "error_report": (
                f"budget cant be less than one"
            )
        }
    report = (f"Alright lets work with that")
    return {"status": "success", "report": report}

# wrap the sub agents as a tool since tools and sub agents cannot coexist.
weather_finder_tool = AgentTool(agent=weather_finder)
caller_agent_tool = AgentTool(agent=caller_agent)

# base agent that acts as the manager of every other agent.
root_agent = Agent( # the main agent in every agent.py HAS to have the name "root_agent"
    name="itinerary_time_agent",
    model="gemini-2.0-flash",
    description=(
        "Agent to help plan out an itenerary with a trip based on numerous inputs"
    ),
    instruction=(
        "You are a helpful agent that helps create an itenerary on the trip based on a budget,"
        " destination, and date. You may use google search to find the weather of that area. "
        "For any information related to the location, culture, or celebratory events, "
        "you MUST call the callerAgent."
    ),
    tools=[get_budget, weather_finder_tool, caller_agent_tool],
)