'use strict';

require('dotenv').config();
const app = require('./src/server.js');
const { db } = require('./src/auth/models');
const { food, clothes } = require('./src/auth/models/index')

// db.sync({force: true}).then(() => {
//   await foodModel.create({})
//   app.start(process.env.PORT || 3001);
// });

async function startSequelize () {
  try {
    await db.sync({force: true})
    await food.create({name: "Carrots", calories: 50, type: "vegetable"})
    await food.create({name: "Pizza", calories: 500, type: "protein"})
    await clothes.create({name: "Shirt", color: 'green', size: "small"})
    await clothes.create({name: "Shirt", color: 'black', size: "large"})
    app.start(process.env.PORT || 3001);
    console.log('Connection is a go!')
  } catch(err) {
    console.log(err)
  }
}

startSequelize()