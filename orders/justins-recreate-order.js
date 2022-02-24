require('dotenv').config();
const Easypost = require('@easypost/api');

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);

// bring in the data from the misc.json file
let data = require('../misc.json')

// Delete order address data
delete data.to_address.id
delete data.to_address.mode
delete data.to_address.verifications
delete data.to_address.updated_at
delete data.to_address.created_at
delete data.to_address.carrier_facility
delete data.to_address.state_tax_id
delete data.to_address.federal_tax_id
delete data.from_address.id
delete data.from_address.mode
delete data.from_address.verifications
delete data.from_address.created_at
delete data.from_address.updated_at
delete data.from_address.state_tax_id
delete data.from_address.federal_tax_id

// Delete all shipment id's, usps_zone's, tracker's, and parcel's
for (let i = 0; i < data.shipments.length; i++) {
  delete data.shipments[i].id
  delete data.shipments[i].state_tax_id
  delete data.shipments[i].federal_tax_id
  delete data.shipments[i].usps_zone
  delete data.shipments[i].order_id
  delete data.shipments[i].tracker
  delete data.shipments[i].to_address.id
  delete data.shipments[i].from_address.id
  delete data.shipments[i].buyer_address.id
  delete data.shipments[i].return_address.id
  delete data.shipments[i].parcel.id
  delete data.shipments[i].parcel.created_at
  delete data.shipments[i].parcel.mode
  delete data.shipments[i].parcel.updated_at
  if (data.shipments[i].parcel.predefined_package === null) {
    delete data.shipments[i].parcel.predefined_package
  }

  // Delete all shipments customs data
  if (data.shipments[i].customs_info) {
    delete data.shipments[i].customs_info.id
    delete data.shipments[i].customs_info.mode
    delete data.shipments[i].customs_info.created_at
    delete data.shipments[i].customs_info.updated_at
    for (let ii = 0; ii < data.shipments[i].customs_info.customs_items.length; ii++) {
      delete data.shipments[i].customs_info.customs_items[ii].id
      delete data.shipments[i].customs_info.customs_items[ii].mode
      delete data.shipments[i].customs_info.customs_items[ii].created_at
      delete data.shipments[i].customs_info.customs_items[ii].updated_at
      delete data.shipments[i].customs_info.customs_items[ii].currency
    }
  }
}

// data.to_address.federal_tax_id = 'IE123456789000'
// data.from_address.federal_tax_id = 'GB123456789000'

// Recreate the order
const order = new api.Order({
  to_address: data.to_address,
  from_address: data.from_address,
  shipments: data.shipments,
  options: data.options,
  carrier_accounts: [{ id: process.env.dhlEcs }],
});

order.save().then(console.log).catch(console.log);