const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.prodKey);  // prodKey
// const api = new Easypost(process.env.testKey);     // testKey


// **** If no user id is passed in, the user returned is the owner of the api key.

// RETRIEVE YOUR ACCOUNT
// api.User.retrieve().then(console.log).catch(console.log);


// RETRIEVE A CHILD ACCOUNT
api.User.retrieve('user_0cc536d449d14199b4fea5d1b9dfcf72').then(console.log).catch(console.log);

