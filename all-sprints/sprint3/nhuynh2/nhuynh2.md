# Sprint 3
* Ngan Huynh
* GitHub ID: nhuynh2
* Group iHear

### What you planned to do
* [#58](https://github.com/utk-cs340-fall24/iHear/issues/58]) I added a utility functions (/components) to help with expanding pictures and routing.
* [#47](https://github.com/utk-cs340-fall24/iHear/issues/47) I improved the Ticket Dashboard for more responsive animation.
* [#47](https://github.com/utk-cs340-fall24/iHear/issues/47) I integrated navigation functionality in buttons and ticket objects to navigate smoothly between pages.
* [#47](https://github.com/utk-cs340-fall24/iHear/issues/47) I added an "Add Ticket" button in the Ticket Dashboard to direct users to the Report Submission page where they can create new tickets.
* [#47](https://github.com/utk-cs340-fall24/iHear/issues/47) I added animation to that button to hide it when user scroll the screen to ease the look of the Dashboard.
* [#61](https://github.com/utk-cs340-fall24/iHear/issues/61) I reformatted the anonymous sign-in function.
* [#71](https://github.com/utk-cs340-fall24/iHear/issues/71) In back-end processes, I finished training myself with Firebase tutorials on using their Cloud Storage service to store pictures inputted in our app.

### What you did not do
* Create a staff profile using the navigation bar on the Ticket Dashboard page.
* Filter signed in Managers.
* Create a staff dashboard for assigning tasks.
* Successfully process pictures in the data storage for GET and POST functionality.
* Activate automation for real-time updates for images. 

### What problems you encountered
As a student, I still have very limited experience with all the tools we have been using for this project. I am trying to teach myself and find sources/tutorials to minimize this knowledge gap. So far, I have not had technical issues with the workflow because we have an experienced and well-organized team leader - Leon. However, it always takes me a long time to learn and code and then fix the code multiple times, not really knowing what is wrong in developing the tasks. I just wish there was another skill class for us to learn what the actual development process of an app would be like in real life so that we could build a very well-functioning product.

### Issues you worked on
[#58](https://github.com/utk-cs340-fall24/iHear/issues/58]) [#47](https://github.com/utk-cs340-fall24/iHear/issues/47) [#61](https://github.com/utk-cs340-fall24/iHear/issues/61) [#71](https://github.com/utk-cs340-fall24/iHear/issues/71)

### Files you worked on
* app/index.tsx
* components/ImageExpand.tsx
* app/(auth)/dashboard.tsx
* components/navigation/routes.tsx
* components/AddTicketButton.tsx

### What you accomplished
1. Navigation Enhancements:

* Dashboard to Report Page: Added functionality to navigate directly to the Report page when clicking "Add New Ticket" on the Dashboard, providing a seamless experience for creating new tickets.

* Dashboard to TicketDetail Page: Enabled navigation from any open ticket on the Dashboard to the corresponding TicketDetail page, allowing users to quickly view and manage ticket details.

2. Image Expansion Utility:

* Created a utility function for expanding images, which is particularly useful for displaying larger versions of avatars or other images when space is limited.
* File: ImageExpand in ./components/

3. Centralized Routes Utility:

* Developed a centralized routing utility for consistent and manageable navigation paths throughout the app, making it easier to modify routes in the future.
* File: routes.tsx in ./components/navigation

4. Branch Updates:

* Restored essential files and features that were lost during branch changes, ensuring continuity in the app’s functionality and feature set.
