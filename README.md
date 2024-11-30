# iHear

## Table of Contents
1. [Overview](#overview)
2. [Features](iHear.pdf)
3. [Welcome Developer!](#welcome-developer)
4. [Technical Requirements](#technical-requirements)
5. [Troubleshooting](#troubleshooting)
6. [Usage](#usage)
7. [License](#license)
8. [Acknowledgments](#acknowledgments)

## Overview
Have you ever seen a problem around campus that needed to be addressed, but you didn't know who to contact? iHear has the solution! 
## Features
There is a full pdf presentation of features here 👉 [iHear Features](iHear.pdf)

## Welcome Developer!
### New Developer
You'll need to set up XCode before we can get started. This will be a one time set up.

Have the iHear repository cloned on your local device

1. Open XCode, select the iHear project (it should appear in the left side bar) ![Step 1](README-photos/image3.png)
2. Go to XCode -> Settings -> Locations
3. In the Command Line Tools dropdown, select the most recent version (we used XCode 16.0) ![Step3](README-photos/image4.png)
4. Install Watchman with the following commands in your terminal
    - `brew update`
    - `brew install watchman`
5. Open XCode -> Settings -> Accounts -> Sign into your iCloud
![Step 5](README-photos/image1.png)
6. In the same tab: Accounts -> Manage Certificates -> Add (+) -> Done
![Step 6](README-photos/image2.png)
7. Close out of the settings menus, and come back to the project screen.
![Step 7](README-photos/image5.png)
8. You'll see the icon with our logo, as in the phot above. Click on it.
9. Your screen may look like one of the two following images. We will be changing the settings on both pages. 
![Signing](README-photos/image6.png)
![General](README-photos/image7.png)
10. On the Signing page, ensure the Team dropdown matches the certificate you just made.
11. On the general page, use iOS 16, as that is the current specs we have designed the app around. 
12. Proceed with the steps in [Existing Developer](#existing-developer) in VSCode or IDE of choice. 

--- 

NOTE: Should you encounter problems later, come back to XCode and ensure these settings haven't changed on you! 
**Especially if you re-cloned the repository!**

---

### Existing Developer
- Run command: 👉 **git pull** 👈 to download all new files
- Run command: 👉 **npm install** 👈
- Run command: 👉 **npx expo prebuild** 👈
- To run the app on **iOS**, run command: 👉 **npx expo run:ios** 👈

If you run into any issues, see the [Troubleshooting](#troubleshooting) section

---
### Expect the first time you build the app to take 10-15 minutes! 
This is normal, as the app is downloading all the necessary dependencies.

---


## Technical Requirements
**These are the conditions our developed and tested on. Install and run on lower requirements at your own risk**
- MacOS Sonoma 14.6
- XCode
- VSCode (or your preferred IDE)
- Up to 1.5 GB of available storage (the code repository, npm nodes, and cocoapods collectively take 1.2 GB of memory)


## Troubleshooting
- **Error: Unable to find a suitable version of cocoapods**: Go back into XCode and check that you are on the right iOS and that your certificate is selected (see [New Developer](#new-developer) if you're confused).
    - cd into `ios` and type in `pod install`
- If any issues persist, try deleting your instance of the iHear directory from your local machine and re-clone.

## Usage
[Watch this video here!](https://jam.dev/c/1adf66d7-8010-48a0-b520-e97981b2d3dd)

## License
This software is proprietary and confidential. Redistribution, modification, or use of any part of this software without explicit written permission from the copyright holder is strictly prohibited.

Third-party libraries used in this project are licensed under their respective open-source licenses. See [License](LICENSES.txt) and [Notices](NOTICES.txt) for details.

## Acknowledgements
- Team Leader: PhuHoang177
- Idea by: PhuHoang177
- Design by: PhuHoang177
- Database by: PhuHoang177 & nhuynh2