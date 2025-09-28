# imports for the models
import os
import asyncio
from google.adk.agents import Agent
from google.adk.sessions import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types # For creating message Content/Parts
from google.adk.tools import google_search
from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

# imports for timezones
import datetime
from zoneinfo import ZoneInfo

# setup the location sub agent first since it is large.

# sub agent to focus on finding the culture of the location.
culture_finder = LlmAgent(
    name = "LocationFinderAgent",
    model = "gemini-2.5-flash",
    instruction = "You are an agent that utilizes google search "
                  "to find information about the culture of the location provided. "
                  "Please provide this information to the user as if they know "
                  "very little of this location's culture, "
                  "while also giving the user the opportunity to learn as much as possible. "
                  "Do not provide any information that is not related to the culture " \
                  "of the location provided.",
    tools = [google_search]
)

# sub agent to focus on finding events happening in the location,
# needs both location and the date range.
event_finder = LlmAgent(
    name = "eventFinderAgent",
    model = "gemini-2.5-flash",
    instruction = "You are an agent that utilizes google search to find "
                  "information about celebratory events happening soon "
                  "in the location provided and also within the date range provided."
                  "Do not provide any information that is not related to any celebratory "
                  "events taking place in the location provided "
                  "and within the date range provided. "
                  "If no date range is provided, do not return anything.",
    tools = [google_search]
)

# whatever tools the location agent needs goes here


# turn sub agents into tools, since tools and sub agents cannot coexist.
culture_finder_tool = AgentTool(agent=culture_finder)
event_finder_tool = AgentTool(agent=event_finder)

# location agent, focused on finding information about the location the user queries about.
location_agent = LlmAgent(
    name = "itinerary_location_agent",
    model = "gemini-2.5-flash",
    description = "Provides information about the culture and celebratory events "
                  "of the location the user queries about.",
    instruction = "You are a phenomenal tour guide. "
                  "When the user asks about a city, state, country, "
                  "or continent that exists on Earth, "
                  "you MUST use both the culture_finder_tool and the event_finder_tool "
                  "to gather information. Synthesize the results into a single, cohesive, and comprehensive travel guide response "
                  "that covers both culture and events. "
                  "If a location that is not on Earth, or does not exist, is given, "
                  "politely ask the user to provide a location that exists on Earth.",
    tools = [culture_finder_tool, event_finder_tool]
)

# wrap location sub agent as a tool
location_agent_tool = AgentTool(agent=location_agent)

# now setup smaller sub agents and tools for the root agent.

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

# budget tool for the root agent
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

# base agent that acts as the manager of every other agent.
root_agent = Agent( # the main agent in every agent.py HAS to have the name "root_agent"
    name="itinerary_time_agent",
    model="gemini-2.0-flash",
    description=(
        "Agent to help plan out an itenerary with a trip based on numerous inputs"
    ),
    instruction=(
        "You are a helpful agent that helps create an itinerary on the trip based on a budget,"
        " destination, and date. For a single query, you MUST attempt to concurrently gather "
        "the following information using the available tools: "
        "1. Weather information using the `weather_finder_tool`."
        "2. Location and culture details using the `location_agent_tool`. "
        "The user should be made aware of the culture the destination has, and how to "
        "engage with people in a respectful manner. "
        "Return all text formatted properly in markdown with spacing and bullet points"
    ),
    tools=[get_budget, weather_finder_tool, location_agent_tool],
)