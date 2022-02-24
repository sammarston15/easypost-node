require('dotenv').config();
const Easypost = require('@easypost/api');

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);

// bring in the data from the misc.json file
let ship = require('../misc.json')


// DELETES ALL THE UNESSCESARY ATTRIBUTES
if (ship.to_address) {
  delete ship.to_address.id
  delete ship.to_address.mode
  delete ship.to_address.updated_at
  delete ship.to_address.created_at
  delete ship.to_address.carrier_facility
}

if (ship.from_address) {
  delete ship.from_address.id
  delete ship.from_address.created_at
  delete ship.from_address.mode
  delete ship.from_address.updated_at
}


if (ship.parcel) {
  delete ship.parcel.id
  delete ship.parcel.created_at
  delete ship.parcel.mode
  delete ship.parcel.updated_at
}

if (ship.rates) {
  delete ship.rates
}

if (ship.selected_rate) {
  delete ship.selected_rate
}

if (ship.parcel.predefined_package === null) {
  delete ship.parcel.predefined_package
};

if (ship.customs_info) {
delete ship.customs_info.id
delete ship.customs_info.created_at
delete ship.customs_info.mode
delete ship.customs_info.updated_at
for (i = 0; i < ship.customs_info.customs_items.length; i++) {
  delete ship.customs_info.customs_items[i].id
  delete ship.customs_info.customs_items[i].created_at
  delete ship.customs_info.customs_items[i].mode
  delete ship.customs_info.customs_items[i].updated_at
  if(ship.customs_info.customs_items[i].currency === null) {
    delete ship.customs_info.customs_items[i].currency
  }
 }
}

// extras (depending on the shipment and the options)
if (ship.options.payment) {
  delete ship.options.payment
}
if (ship.options.bill_receiver_account) {
  delete ship.options.bill_receiver_account
}
if (ship.options.bill_receiver_postal_code) {
  delete ship.options.bill_receiver_postal_code
}


// ship.options.label_format = "PDF"
// ship.options.label_size = "8.5X11_BOTTOM_HALF_LABEL"
// ship.to_address.state = null
ship.options.commercial_invoice_letterhead = null
ship.options.commercial_invoice_signature = null



// SHIPMENT
const shipment = new api.Shipment({
    // to_address: ship.to_address,
    to_address: 'adr_1563b2aebdd749ce9c3989ed5c54fccf',
    from_address: ship.from_address,
    // from_address: process.env.adr_us_two,
    // return_address: process.env.adr_us_one,
    // buyer_address: process.env.adr_us_two,
    parcel: ship.parcel,
    customs_info: ship.customs_info,
    options: ship.options,
    carrier_accounts: [`${process.env.dhlExpress}`],
    // service: 'FirstClassPackageInternationalService',
    is_return: ship.is_return,
    reference: ship.reference
})


// save shipment
shipment.save().then(console.log).catch(error => console.log(error));


//============buy shipment by lowest rate============
// shipment.save().then(buyShipment => {
//   shipment.buy(shipment.lowestRate())
//     .then(console.log).catch(console.log);
// }).catch(console.log);

//============buy shipment by carrier name/service type============
// shipment.save().then(s =>
//   s.buy(shipment.lowestRate(['AustraliaPost'], ['ParcelPostSignature']))
//     .then(console.log).catch(error => console.log('buy shipment catch: ', error))
// ).catch(error => console.log('save shipment catch: ', error));

// ============buy shipment by ID============
// api.Shipment.retrieve('shp_74186b66c64c457f91267338fdec2454').then(s => {
//   s.buy('rate_283ed58972be4bd6a01e19a3fd110e08').then(console.log).catch(console.log);
// }).catch(console.log);