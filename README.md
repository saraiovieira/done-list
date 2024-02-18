<!-- INTRO -->
<div align="center">
	<h2 align="center">✅ Done List</h2>
	<p align="center">
		<img width="487px" height="279" src="https://github.com/saraiovieira/done-list/assets/74243584/11bd1fa2-9478-451e-a8e9-2afc1ca62a72" alt="done list app screenshot" />
	</p>

  <p align="center">
	A responsive web application to log completed tasks and celebrate your accomplishments
	<br />
	<br />
	<a href="https://github.com/saraiovieira/done-list/issues">Report Bug</a>
	  ·
	<a href="https://github.com/saraiovieira/done-list/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
      <ul>
        <li><a href="#about-donelist">About DoneList</a></li>
	<li><a href="#client"> Client </a></li>
	<li><a href="#server"> Server </a></li>
        <li><a href="#run-locally"> Run Locally </a></li>
      </ul>
</details>
<!-- ABOUT THE PROJECT -->

## About DoneList
DoneList is a web application with client side and the server side. 
- The client-side is built with React. 
- The server side is built with Node.js and MongoDB.

<!-- Client -->

## Client

### Libraries:
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Calendar](https://www.npmjs.com/package/react-calendar)

### Features/Designs:
#### Login page
- The login can be made using email and password saved on the server or you can enter as a guest where it's used local storage
<img width="487px" height="279" src="https://github.com/saraiovieira/done-list/assets/74243584/ee3164f4-a5a7-406e-b87e-75caa0ccb30d" alt="done list app screenshot" />

 #### Tasks page
 - Choose date in the calendar
<img width="487px" height="279" src="https://github.com/saraiovieira/done-list/assets/74243584/e20e8b0d-f824-4003-9518-cd1ebfda477d" alt="done list app screenshot" />

- Show Tasks
- Edit Tasks
- Delete Tasks
<img width="487px" height="279" src="https://github.com/saraiovieira/done-list/assets/74243584/e0a07e66-fa6e-4c04-9ebe-3f9c1d47b0d3" />

<!-- Server -->
## Server
- Implemented in Node.js and MongoDB

### Server API
- POST /register
- POST /login
- POST /tasks
- GET /tasks
- PUT /tasks/{id}
- DELETE /tasks/{id}

<!-- RUN LOCALLY-->

## Run Locally

### How to run the app on your computer

1. Clone this repo to your computer.
```
  git clone https://saraiovieira/done-list.git
```
2. Open a terminal and go the folder in which you cloned this repo.
3. Go to the client folder and run the next steps.
4. Run ``` npm install``` to download and install all the packages in `package.json`
   to the `node_modules` directory.
5. Run ``` npm start``` to launch the dev server on localhost port.
6. Go to the server folder and repeat step 4 and 5.
