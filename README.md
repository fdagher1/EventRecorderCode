# EventRecorderCode
Code repository for EventRecorder

**v0.1.0**
1 - Auth0 Added (github)
2 - Event Module Created
3 - Moved lower buttons to the top
4 - Changed eventType HTML control from input to select
5 - Added comments

**v0.2.0**
6 - Added About page
7 - Moved all buttons to bottom of page 

**v0.2.1**
9 - Set the panel-footer classes in all HTMLs to position: fixed

**v0.3.0**
10 - Added remaining event attributes (event start, end, city, state, country, cost, and comment)
11 - Removed label elements from the event forms 
12 - Set default value for event type, start and end for new events
13 - Debugger for Chrome (VS code addin) updated to v 3.0.1
14 - Auto Close Tag (VS code addin) updated to v 0.3.11

**v0.3.1**
15 - Set top ribbon as position: fixed
16 - Using Event Edit for both viewing and editing the event (removed event details component)

**v0.3.2(not released yet)**

**Future plans**
Bug fixes:
Fix issue where after saving an event, the form controls are all blank
Enhancement:
Add auto-fill for country text box
Update Service class to merge Update and Create event functions into the Save event function (for ease of flow)
Exclude the out folder from the git repo (is node_modules excluded already?)

Modify eventedit.html layout to look more user friendly. Add lables for some entries? 
Add individual symbols for each input control to indicate it has valid data (bootstrap guide shows how)
Add route guards
Store data in the backend: Check how to pull username or id and add to the Event model
Add validators for some of the event attribute controls (not sure which yet)
