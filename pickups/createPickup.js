require('dotenv').config();


const Easypost = require('@easypost/api');
const apiKey = process.env.testKey;
// const apiKey = process.env.prodKey
const api = new Easypost(apiKey);





/* Either objects or ids can be passed in for addresses and
 * shipments. If the object does not have an id, it will be
 * created. */
// const address = new api.Address({
//     name: 'EasyPost',
//     street1: 'Ferris Dr 6410',
//     city: 'Houston',
//     state: 'TX',
//     zip: '77081',
//     phone: '5481855189',
// });

const address = 'adr_951a400d520511ecb9dbac1f6bc7b362'
const shipment = 'shp_7e71ac2bce4843bcb20c8e4b90e8b90b';

const pickup = new api.Pickup({
    address,
    shipment,
    reference: 'test pickup',
    min_datetime: "2021-12-01T8:00:00Z",
    max_datetime: "2021-12-01T15:00:00Z",
    is_account_address: false,
    instructions: 'my instructions',
});

// pickup.save().then(console.log).catch(console.log);

// pickup and buy
pickup.save().then(p => {
    p.buy('USPS', 'NextDay').then(console.log).catch(console.log);
  }).catch(console.log);