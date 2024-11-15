# Sprint 4
* Ngan Huynh
* GitHub ID: nhuynh2
* Group iHear
* Branch: #73-messaging

### What you planned to do
* [#73](https://github.com/utk-cs340-fall24/iHear/issues/73]) I reconstructed the ticket details page to sync data in real time with the database. I also enabled Firebase Cloud Messaging (FCM) to implement the notification feature. Additionally, I developed 4 to 5 functions to automate the process of listening for changes in ticket status and incoming messages from FCM in the background.

* [#73](https://github.com/utk-cs340-fall24/iHear/issues/73]) I worked on the logic for retrieving necessary information, such as device tokens, to identify who should receive notifications and which updated ticket statuses need to be sent. I also added a function to update the ticket status and synchronize these changes with the database.

* [#73](https://github.com/utk-cs340-fall24/iHear/issues/73]) Furthermore, I introduced a "subscribe" button on the ticket details page, allowing users to subscribe or unsubscribe from specific tickets. When users interact with the button, their device tokens are added to the ./notifications collection in the database. Since users can sign in on multiple devices, each device is assigned a token, allowing notifications to be sent to the appropriate devices. Tokens are regularly updated and removed once they expire. This setup facilitates automated workflows.

* Convert locally updated photos (with file:// paths) to https:// URLs.

### What you did not do
I achieved 99% of my task goals in this sprint, with the exception of converting locally updated photos (from file:// paths) to https:// URLs.

### What problems you encountered
It is coming to the exam season and my schedule has been really tight. However, I finished my tasks for this sprint.

### Issues you worked on
[#73](https://github.com/utk-cs340-fall24/iHear/issues/73])
### Files you worked on
* ./app/(auth)/ticketdetails.tsx
* ./app/(auth)/messaging.tsx
* ./app/(auth)/dashboard.tsx
* ./package-lock.json
* ./package.json

### What you accomplished
1. Automated the messaging workflow and successfully synchronized data with the backend.
2. Improved user-facing pages to enhance the overall user experience.
