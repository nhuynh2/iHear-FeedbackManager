# Sprint 3

## Info

- Name: Leon Hoang (Phu Hoang)
- NetID: phoang5
- GithubID: PhuHoang177
- Group name: iHear

## What I planned to do

- Team leading: create many issue detail, create task board, and code review
- System: Reconstruct the entire repository
- Document: Github Workflow instruction
- Database: Design Database relationship and object
- Back-end: Database connection - Post
- Back-end: Database connection - Get
- Front-end: Improve the Dashboard

## What I did not complete

- Database: Design database relationships and objects
- Back-end: Database connection - Get

## What problems you encountered

- Team's limited velocity: Although I prepare many tasks, some members only one easy task, or none.

## What issue I worked on

- [#42](https://github.com/utk-cs340-fall24/iHear/issues/42): Improve Dashboard
- [#44](https://github.com/utk-cs340-fall24/iHear/issues/44): Database Connection: Post
- [#50](https://github.com/utk-cs340-fall24/iHear/issues/50): Write a document instruction of our Github Workflow
- [#51](https://github.com/utk-cs340-fall24/iHear/issues/51): Reconstruct the entire repository

## Files that I worked on

- Note: All of my work is on the "main" branch

- Issue #42: ./app/(auth)/dashboard.tsx

- Issue #44:

  - ./GoogleService-Info.json
  - ./app/(auth)/report.tsx
  - ./firebase-config.ts

- Issue #50: ./documents/Github-workflow.docx

## What I accomplished

- I wrote an instruction document to help other members follow the Github workflow: ./documents/Github-workflow.docx

- I reconstructed the our repository:
- - Change the name of old main branch to broken, because that branch is actually broken.
- - Change the regular-auth branch to main, so it becomes our new main.
- - Move all contents of little iHear to the very outside (big iHear), so we no longer confuse between 2 iHear folders. Now there is only one big iHear folder, which is our repository.
- - Remove some unnecessary folders and files (./projects) to make the repository lightweight and organized.
- - Update the README.md in of our repository to instruct how to run our app.
- - Important: Ensuring the app is still running perfectly after reconstructing.

- I spent one day to write more than 10 stories (issues #39 to #51), requirements, and assign them on the task queue.

- I improved front-end of the Dashboard page:
- - Each item is now clickable.
- - The list is able to scroll smoothly.

- I set-up connection with Database:
- - I config a file as an API to communicate with database: ./GoogleService-Info.json and ./firebase-config.ts
- - I made successfully upload data to database: ./app/(auth)/report.tsx

- I review code of many Pull Requests:
- - github.com/utk-cs340-fall24/iHear/pull/60
- - github.com/utk-cs340-fall24/iHear/pull/62
- - github.com/utk-cs340-fall24/iHear/pull/63
- - github.com/utk-cs340-fall24/iHear/pull/64
- - github.com/utk-cs340-fall24/iHear/pull/69
