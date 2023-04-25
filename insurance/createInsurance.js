/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============buy shipment by lowest rate============
try {
  const insurance = await client.Insurance.create({
    to_address: { id: 'adr_...' },
    from_address: { id: 'adr_...' },
    tracking_code: '9400110898825022579493',
    carrier: 'USPS',
    amount: '100.00',
    reference: 'insuranceRef1',
  });

  console.log(insurance);
} catch (error) {
  console.log("   ")
  console.log("ERROR CREATING INSURANCE:")
  console.log(error)
}