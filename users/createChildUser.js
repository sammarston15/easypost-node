const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.prodKey);  // prodKey
// const api = new Easypost(process.env.testKey);     // testKey


const user = new api.User({
  name: 'Smalley testing',
})

user.save().then(console.log).catch(error => console.log(error));