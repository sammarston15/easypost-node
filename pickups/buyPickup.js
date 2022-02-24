
require('dotenv').config();


const Easypost = require('@easypost/api');
const apiKey = process.env.testKey;
// const apiKey = process.env.prodKey;
const api = new Easypost(apiKey);



// retrieve pickup
// api.Pickup.retrieve('pickup_7c5fbce9db9d42bfbd14cef95d8b583c').then(p => console.log(p.pickup_rates[0].service));

// retrieve and buy pickup
api.Pickup.retrieve('pickup_4a00ffa069d94e72a8b3d5bd45fcd9a1').then(p => {
    p.buy('USPS', 'NextDay').then(console.log).catch(console.log);
  }).catch(console.log);