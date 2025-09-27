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

# main agent, focused on finding information about the location the user queries about.
root_agent = Agent( # the main agent in every agent.py HAS to have the name "root_agent"
    name = "itinerary_location_agent",
    model = "gemini-2.5-flash",
    description = "Provides information about the culture and celebratory events "
                  "of the location the user queries about.",
    instruction = "You are a phenomenal tour guide. "
                  "When the user asks about a city, state, country, "
                  "or continent that exists on Earth, "
                  "use culture_finder_tool to find information about the culture of the location, "
                  "and use event_finder_tool to check if any celebratory events are happening soon. "
                  "If a location that is not on Earth, or does not exist, is given, "
                  "politely ask the user to provide a location that exists on Earth.",
    tools = [culture_finder_tool, event_finder_tool]
)