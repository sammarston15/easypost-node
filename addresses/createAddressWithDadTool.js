require('dotenv').config();
const Easypost = require('@easypost/api');
const dad = require('dad-tool')

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);


// Grab a random UT address
const address = dad.random('US_UT')


const newAddress = new api.Address({
  
})