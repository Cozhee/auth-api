# bearer-auth# LAB - Class 401

## Project: Basic Express Server

### Author: Cody Davis

### Problem Domain
Setting up a basic express server to configure heroku deployment and to create tests for basic routes. Implemented with sequelize. Set up encryption and the use of jsonwebtokens. 

### Links and Resources
- [Github](https://github.com/Cozhee/auth-api/pulls)

### Setup

#### `.env` requirements (where applicable)
- `SECRET=`

You will need this secret key in order to use JWT. It is for signing your information.

#### How to initialize/run your application (where applicable)
`npm install` to get the dependencies
`nodemon` to run the server
Open `http://localhost:3001/` to view the server

#### How to use your library (where applicable)
N/A

#### Features / Routes
- Feature One: Added route
- POST : `/signup`
- POST : `/signin`

- Feature Two: Added route
- GET: `/users`
- GET: `/secret`

Each route will be using middleware to check if a user has basicAuth or bearerAuth included in these requests. These are protected routes which are unreachabled by un authenticated users.


#### Tests
To run tests type `npm test`. Server does not need to be running in another instance
Basic tests that will check if routes are working correctly

