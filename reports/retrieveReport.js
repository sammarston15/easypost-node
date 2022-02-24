require('dotenv').config();
const Easypost = require('@easypost/api');
// const api = new Easypost(process.env.testKey);
const api = new Easypost(process.env.prodKey);

api.Report.retrieve('shpinvrep_72467324261346e7989fece65f24129b').then(console.log).catch(console.log);
