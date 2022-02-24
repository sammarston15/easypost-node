require('dotenv').config();
const Easypost = require('@easypost/api');
const api = new Easypost(process.env.testKey);
// const api = new Easypost(process.env.prodKey);

const order = new api.Order({
  from_address: {
    company: 'EasyPost',
    street1: '417 Montgomery Street',
    street2: '5th Floor',
    city: 'San Francisco',
    state: 'CA',
    zip: '94104',
    phone: '415-528-7555'
  },
  to_address: {
    company: 'Briostack ',
    street1: '525 S 850 E',
    street2: '#3',
    city: 'Lehi',
    state: 'UT',
    zip: '84043',
    country: 'US',
    phone: '801-524-0014'
  },
  shipments: [
    new api.Shipment({
      parcel: {
        predefined_package: 'FedExBox',
        weight: 10.2
      }
    }),
    new api.Shipment({
      parcel: {
        predefined_package: 'FedExBox',
        weight: 17.5
      }
    })
  ],
  carrier_accounts: [{"id":"ca_23bada2a180b419a977a241bf03188cd"}],
  service: ["FEDEX_2_DAY"],
});

order.save().then(console.log).catch(console.log);