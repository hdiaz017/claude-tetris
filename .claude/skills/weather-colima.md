---
name: weather-colima
description: Get detailed current weather and 3-day forecast for Colima, Mexico
---

Fetch detailed weather information for Colima, Mexico.

**Steps:**
1. Run `curl -s "wttr.in/Colima?format=%l:+%C+%t+FeelsLike:%f+Humidity:%h+Wind:%w+Visibility:%v"` to get current detailed stats.
2. Run `curl -s "wttr.in/Colima?format=3"` to get a quick summary.
3. Run `curl -s "wttr.in/Colima?0&format=3"` then `curl -s "wttr.in/Colima?1&format=3"` and `curl -s "wttr.in/Colima?2&format=3"` (or simply `curl -s "wttr.in/Colima?format=4"` for a broader overview) to get the forecast. 
   *Preferably: Run `curl -s "wttr.in/Colima?format=j1"` and parse the JSON for the most accuracy, or use `curl -s "wttr.in/Colima?0&format=3"` etc. for simple text.*

**Actual command for detailed current weather:**
`curl -s "wttr.in/Colima?format=%l:+%C+%t+FeelsLike:%f+Humidity:%h+Wind:%w+Visibility:%v"`

**Actual command for 3-day forecast:**
`curl -s "wttr.in/Colima?format=3" && curl -s "wttr.in/Colima?1&format=3" && curl -s "wttr.in/Colima?2&format=3" && curl -s "wttr.in/Colima?3&format=3"`

Present the results clearly to the user.
