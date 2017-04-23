# EventRecorderCode
Code repository for EventRecorder

**v0.1.0**
1 - Auth0 authentication added (github)
2 - Created Event module
3 - Moved lower buttons to the top
4 - Changed eventType HTML control from input to select
5 - Code cleanup

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

**v0.3.2**
17 - Code cleanup
18 - Excluded /out folder from GIT repo
19 - Bug fix: After saving an event, the form controls are no longer blank

**v0.3.3**
20 - Removed form builder (for simplicity)
21 - Added autocomplete functionality for Country
22 - Style changes for About page and some HTML elements
23 - Adding sorting capability for the EventList view
24 - Added key attributes to the EventList view

**v0.3.4**
25 - Bug fix: Event data column in EventList did not hide properly when site accessed from a small device

**Future plans**
Enhancement:
Modify eventedit.html layout to look more user friendly (lables, etc..)
Add individual symbols for each input control to indicate it has valid data (bootstrap guide shows how)
Add route guards
Store data in the backend: Check how to pull username or id and add to the Event model
Add validators for some of the event attribute controls (not sure which yet)

Bugs:
Sorting in EventList is always done by name 
When a browser automatically fills fields, the save button remains greyed out
Downloading the app the first time takes a long time

Known issues:
Date input elements appear small on iPhone only