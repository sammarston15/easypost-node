require('dotenv').config();


const Easypost = require('@easypost/api');
// const apiKey = process.env.testKey;
const apiKey = process.env.prodKey;
const api = new Easypost(apiKey);

const verifiableAddress = new api.Address({
    verify: ['delivery', 'zip4'],
    company: 'testing',
    name: 'test name',
    street1: '11960 S Bull St',
    street2: 'Apt 12106',
    city: 'Herriman',
    state: 'UT',
    zip: '84096',
    country: 'US',
});
verifiableAddress.save().then(r => {console.log(r)}).catch(console.log);


// verifiableAddress.save().then(a => {
//     console.log(a.verifications)
//   }).catch(console.log);
