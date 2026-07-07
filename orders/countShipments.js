/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

// bring in the data from the misc.json file
import data from "../misc.json" with { type: "json" }


const countShipments = async () => {
    try {
        const shipments = await data.shipments;
        const shipmentIDs = shipments.map((shipment) => shipment.id);
        console.log(`SHIPMENT IDS:\n${shipmentIDs.join("\n")}`);
        console.log(`Total Shipments: ${shipments.length}`);
    } catch (error) {
        console.log("   ")
        console.log("COUNT SHIPMENTS ERROR:")
        console.log(error)
    }
}


countShipments();

