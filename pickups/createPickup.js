/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============create a pickup============
try {
    const pickup = await client.Pickup.create({
        address: { id: 'adr_...' },
        shipment: { id: 'shp_...' },
        reference: 'my-first-pickup',
        min_datetime: '2022-10-01 10:30:00',
        max_datetime: '2022-10-02 10:30:00',
        is_account_address: false,
        instructions: 'Special pickup instructions',
      });
    
      console.log(pickup);
} catch (error) {
  console.log("   ")
  console.log("PICKUP CREATE ERROR:")
  console.log(error)
}