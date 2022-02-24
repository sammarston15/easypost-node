const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.testKey);

api.Insurance.all({
  page_size: 2,
  start_datetime: '2016-01-02T08:50:00Z',
}).then(console.log);
