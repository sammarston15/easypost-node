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


/**
 * TOOL DESCRIPTION AS SHOWN IN https://www.easypost.com/docs/api#retrieve-rates-for-a-shipment
 * 
 * You can retrieve Rates without creating a Shipment object using this endpoint. 
 * This endpoint is ideal when wanting to display or compare rates without creating Shipment objects. 
 * The Rate objects returned by this endpoint do not include IDs.
 */


try {
  const rates = await client.Beta.Rate.retrieveStatelessRates({
    to_address: {
      name: 'Dr. Steve Brule',
      street1: '179 N Harbor Dr',
      city: 'Redondo Beach',
      state: 'CA',
      zip: '90277',
      country: 'US',
      email: 'dr_steve_brule@gmail.com',
      phone: '4155559999',
    },
    from_address: {
      street1: '417 montgomery street',
      street2: 'FL 5',
      city: 'San Francisco',
      state: 'CA',
      zip: '94104',
      country: 'US',
      company: 'EasyPost',
      phone: '415-123-4567',
    },
    parcel: {
      length: 20.2,
      width: 10.9,
      height: 5,
      weight: 65.9,
    },
  });

  console.log(rates);

} catch (error) {
  console.log("   ")
  console.log("STATELESS RATING ERROR:")
  console.log(error)
}
