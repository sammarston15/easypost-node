/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============buy a pickup============
try {
  const pickup = await client.Pickup.retrieve('pickup_...');

  const boughtPickup = await client.Pickup.buy(pickup.id, 'UPS', 'Same-day Pickup');

  console.log(boughtPickup);
} catch (error) {
  console.log("   ")
  console.log("PICKUP BUY ERROR:")
  console.log(error)
}