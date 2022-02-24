const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.prodKey);

api.CarrierAccount.all().then(console.log);
