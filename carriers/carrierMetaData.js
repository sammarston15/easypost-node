/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostBetaClient from "@easypost/api/src/beta/easypost"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostBetaClient(process.env.TEST_KEY) // testKey

//============retreive carrier metadata============
try {
    // Request all metadata for all carriers
    const carrierMetadata =
        await client.BetaCarrierMetadata.retrieveCarrierMetadata()
    console.log(carrierMetadata)

    // Request specific metadata for specific carriers
    const carrierMetadataWithFilters =
        await client.BetaCarrierMetadata.retrieveCarrierMetadata(
            ["usps"],
            ["service_levels", "predefined_packages"]
        )
    console.log(carrierMetadataWithFilters)
} catch (error) {
    console.log("   ")
    console.log("ERROR RETRIEVING CARRIER METADATA:")
    console.log(error)
}
