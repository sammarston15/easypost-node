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
  const shipment = await client.Shipment.retrieve('shp_0bcf0f592d9a4bd4919bd7dc507beb11')
  console.log("   ")
  console.log("   ")
  console.log(`attempting to purchase ${shipment.id}...`)
  //============buy shipment by lowest rate============
    // try {
    //     console.log("   ")
    //     console.log("   ")
    //     console.log(`attempting to purchase ${shipment.id}...`)
    //     const boughtShipment = await client.Shipment.buy(
    //         shipment.id, // shipment id
    //         shipment.lowestRate(), // shipment rate
    //         null, // insurance
    //         null, // carbon offset
    //         // process.env.TEST_ENDSHIPPER_ID_EXAMPLE // end shipper
    //     )
    //     console.log(JSON.stringify(boughtShipment, null, 2))
    // } catch (error) {
    //     console.log("   ")
    //     console.log("SHIPMENT BUY ERROR:")
    //     console.log(error)
    // }

    //============buy shipment by carrier name/service type============
    try {
        const boughtShipment = await client.Shipment.buy(
            shipment.id,
            shipment.lowestRate(["FedEx"], ["FEDEX_GROUND"])
        )
        console.log(JSON.stringify(boughtShipment, null, 2))
    } catch (error) {
        console.log("   ")
        console.log("SHIPMENT BUY ERROR:")
        console.log(error)
    }

} catch (error) {
  console.log("   ")
  console.log("SHIPMENT RETRIEVE ERROR:")
  console.log(error)
}