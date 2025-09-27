location_agent is going to be the A2A server since it should be called by the base agent.

location_agent might need some more tools to properly verify location
    that's some string amnipulation tho so idk

install this for a2a if you havent already
    pip install google-adk[a2a]

we can use the following command for local a2a testing
    adk api_server --a2a

NEW ENVIRONMENT VARIABLE
    LOCATION_AGENT_URL=http://127.0.0.1:<port number of your choosing>/a2a/itenerary_location_agent/.well-known/agent.json

NOTE: i run adk web with port 5000 since 8000 doesnt work
    adk web --port 5000

NOTE: for dealing with the agent.json file,
    we could wrap the agent we want to be the server in the to_a2a() function
    but we wouldn't be able to use adk web for visual debugging.

    by manually creating the agent.json file, however, we can still use adk web for debugging
        this is also the standard for exposing multiple agents at once

the path to the location agent api server should be:
    http://localhost:5000/a2a/itinerary_location_agent/.well-known/agent.json
        * replace the port 5000 with whatever you put as your port for the new env variable
        currently, this doesn't work tho