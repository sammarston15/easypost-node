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
    const order = await client.Order.retrieve('order_...');

    const boughtOrder = await client.Order.buy(order.id, 'FedEx', 'FEDEX_GROUND');
  
    console.log(boughtOrder);
} catch (error) {
  console.log("   ")
  console.log("ORDER BUY ERROR:")
  console.log(error)
}