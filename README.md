# EventRecorderCode
Code repository for EventRecorder

**v0.1.0**<br>
1 - Auth0 authentication added (github)<br>
2 - Created Event module<br>
3 - Moved lower buttons to the top<br>
4 - Changed eventType HTML control from input to select<br>
5 - Code cleanup<br>

**v0.2.0**<br>
6 - Added About page<br>
7 - Moved all buttons to bottom of page <br>

**v0.2.1**<br>
9 - Set the panel-footer classes in all HTMLs to position: fixed<br>

**v0.3.0**<br>
10 - Added remaining event attributes (event start, end, city, state, country, cost, and comment)<br>
11 - Removed label elements from the event forms <br>
12 - Set default value for event type, start and end for new events<br>
13 - Debugger for Chrome (VS code addin) updated to v 3.0.1<br>
14 - Auto Close Tag (VS code addin) updated to v 0.3.11<br>

**v0.3.1**<br>
15 - Set top ribbon as position: fixed<br>
16 - Using Event Edit for both viewing and editing the event (removed event details component)<br>

**v0.3.2**<br>
17 - Code cleanup<br>
18 - Excluded /out folder from GIT repo<br>
19 - Bug fix: After saving an event, the form controls are no longer blank<br>

**v0.3.3**<br>
20 - Removed form builder (for simplicity)<br>
21 - Added autocomplete functionality for Country<br>
22 - Style changes for About page and some HTML elements<br>
23 - Adding sorting capability for the EventList view<br>
24 - Added key attributes to the EventList view<br>

**v0.3.4**<br>
25 - Bug fix: Event data column in EventList did not hide properly when site accessed from a small device<br>

**v0.3.5**<br>
26 - Filtering in EventList is now expanded from Name only to include City, State, Country, and Comment <br>
27 - Moved from using CDN version of bootstrap.css to the local one<br>

**v0.3.6**<br>
28 - Reverted back to using bootstrap from CDN 

**Future plans**<br>
Enhancement:<br>
Upgrade to Angular 4<br>
Add individual symbols for each input control to indicate it has valid data (bootstrap guide shows how)<br>
Add route guards<br>
Store data in the backend: Check how to pull username or id and add to the Event model<br>
Add validators for some of the event attribute controls (not sure which yet)<br>

Bugs:<br>
When a browser automatically fills fields, the save button remains greyed out<br>
Downloading the app the first time takes a long time<br>
Date input elements appear small on iPhone only<br>