const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.prodKey);  // prodKey
// const api = new Easypost(process.env.testKey);     // testKey

api.Tracker.retrieve('trk_939bcbf26ae941bc8a1804e1170d2534').then(console.log).catch(console.log);