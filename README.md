**Remote Coding Web Application**

**About the Project**
<img width="1368" alt="Architecture" src="https://github.com/MichaelHoha/app-client/assets/62392060/0ad1ac3d-7ca7-4c05-bb84-32fce45dc04a">

The Remote Coding web application is designed to facilitate remote coding sessions between mentors and students using real-time collaboration features. This README provides an overview of the project architecture, technologies, features, and implementation details.

**Tools**

* **Frontend:** React.js

* **Backend:** Node.js & Express.js

* **Database:** PostgreSQL

* **ORM (Database Driver):** Sequelize

* **Hosting:** Heroku

* **Syntax Highlighting:** Highlight.js

* **Real-time Data:** Socket.io

**Architecture Overview**

The project follows a client-server architecture, with the frontend and backend components communicating via REST API and Express. The PostgreSQL database is managed using Sequelize ORM. Real-time communication between users is implemented using Socket.io for instant code updates.

**Features**
**Lobby Page**

* Displays a list of available code blocks for selection.
  
* Clicking on a code block redirects users to the corresponding code block page.

**Code Block Page**

* Displays the selected code block.

* **Mentor View:** Displays the code block in read-only mode (not fully implemented).

* **Student View:** Allows students to edit the code block in real-time.

**Deployment**

Both frontend (app-client) and backend (app-server) are deployed separately on Heroku. Continuous integration pipelines ensure smooth deployment from GitHub repositories to Heroku.

**Conclusion**

The Remote Coding web application provides a seamless platform for mentors and students to engage in collaborative coding sessions remotely. It offers real-time code editing and syntax highlighting features, enhancing the learning experience.






