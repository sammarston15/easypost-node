require('dotenv').config();


const Easypost = require('@easypost/api');
const apiKey = process.env.testKey;
// const apiKey = process.env.prodKey
const api = new Easypost(apiKey);

// 3084 Sage Loop, Lehi, UT 84043

const toAddress = new api.Address({
    verify: ['delivery'],
    // company: 'EasyPost',
    name: 'example',
    company: '',
    street1: '1725 E Broadway',
    street2: '',
    city: 'Vancouver',
    state: 'BC',
    zip: 'V5N 1V9',
    country: 'CA',
    phone: '79102484459',
    // residential: true
});

toAddress.save().then((response) => {
  console.log(response)
  if (response.verifications.delivery.errors) {
    console.log({verification_errors: response.verifications.delivery.errors})
  }
}).catch(console.log);

// const fromAddress = new api.Address({
//     company: "StoreMcStoreFace",
//     name: 'John Smith',
//     street1: '358 S 700 E',
//     street2: 'STE B',
//     city: 'Salt Lake City',
//     state: 'UT',
//     zip: '84102',
//     country: 'US',
//     phone: '4165555556',
//     email: 'TEST123@YOPMAIL.COM',
  
  
//     //  company: 'EasyPost',
//     //  name: 'Mr. EP',
//     //  street1: '345 California St',
//     //  street2: 'FL 10',
//     //  city: 'San Francisco',
//     //  state: 'CA',
//     //  zip: '94104',
//     //  country: 'US',
//     //  phone: '8012220000',
//     //  email: 'email@email.com',
//   });

//   fromAddress.save().then(console.log).catch(console.log);




  // api.Address.retrieve('adr_0b1d4a2aecd24056865753553144afab').then(address => {
  //   console.log(address.id);
  // }).catch(console.log);


//   const parcel = new api.Parcel({
//     length: "17.5",
//     height: "11.5",
//     width: "13",
//     weight: "288"
// });
  
//   parcel.save().then(console.log).catch(console.log);