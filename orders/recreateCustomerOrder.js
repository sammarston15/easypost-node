/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey
// const client = new EasyPostClient(process.env.DISABLED_TEST_KEY);     // DISABLED_TEST_KEY to test the error that comes back
// const client = new EasyPostClient(process.env.RICK_CARTER_PROD_KEY);     // RICK_CARTER_PROD_KEY

// bring in the data from the misc.json file
import data from '../misc.json' assert { type: 'json' }

// Delete order address data
delete data.to_address.id
delete data.to_address.mode
delete data.to_address.verifications
delete data.to_address.updated_at
delete data.to_address.created_at
delete data.to_address.carrier_facility
delete data.from_address.id
delete data.from_address.mode
delete data.from_address.verifications
delete data.from_address.created_at
delete data.from_address.updated_at
delete data.return_address.id
delete data.return_address.mode
delete data.return_address.verifications
delete data.return_address.created_at
delete data.return_address.updated_at
delete data.buyer_address.id
delete data.buyer_address.mode
delete data.buyer_address.verifications
delete data.buyer_address.created_at
delete data.buyer_address.updated_at

// Delete all shipment id's, usps_zone's, tracker's, and parcel's
for (i = 0; i < data.shipments.length; i++) {
  delete data.shipments[i].id
  delete data.shipments[i].to_address.id
  delete data.shipments[i].from_address.id
  delete data.shipments[i].buyer_address.id
  delete data.shipments[i].return_address.id
  delete data.shipments[i].usps_zone
  delete data.shipments[i].tracker
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
      for (ii = 0; ii < data.shipments[i].customs_info.customs_items.length; ii++) {
          delete data.shipments[i].customs_info.customs_items[ii].id
          delete data.shipments[i].customs_info.customs_items[ii].mode
          delete data.shipments[i].customs_info.customs_items[ii].created_at
          delete data.shipments[i].customs_info.customs_items[ii].updated_at
          delete data.shipments[i].customs_info.customs_items[ii].currency
      }
  }
}

//============recreate customer's order============
try {
  const order = await client.Order.create({
    to_address: data.to_address,
    from_address: data.from_address,
    buyer_address: data.buyer_address,
    shipments: data.shipments,
    options: data.options,
    customs_info: data.customs_info,
    // is_return: true,
    // carrier_accounts: [{ id: "ca_a44766798f9e4eee9d8d1cd0e53ce4c7" }],
  });

  console.log(order);
} catch (error) {
  console.log("   ")
  console.log("RECREATE ORDER ERROR:")
  console.log(error)
}