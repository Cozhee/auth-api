# LAB - Class 401

## Project: Basic Express Server

### Author: Cody Davis

### Problem Domain
Setting up a basic express server to configure heroku deployment and to create tests for basic routes. Implemented with sequelize. Set up encryption and the use of jsonwebtokens. Set up protected routes that will check a users permissions and capabilities before they are allowed to enter a route.

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
- GET: `/:model/:id`
- POST: `/:model/:id`
- PUT: `/:model/:id`
- DELETE: `/:model/:id`

Each route will be using middleware to check if a user has basicAuth or bearerAuth included in these requests. These are protected routes which are unreachabled by un authenticated users. Also a permissions middleware that will check user capabilities.


#### Tests
To run tests type `npm test`. Server does not need to be running in another instance
Basic tests that will check if routes are working correctly

## UML
![Screen Shot 2022-06-24 at 8 59 24 AM](https://user-images.githubusercontent.com/55909913/175573250-d0e435e7-fea6-496e-b5a6-2ba5189b241f.png)

