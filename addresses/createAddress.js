
/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey
// const client = new EasyPostClient(process.env.CHILD_TEST_KEY) // child testKey
// const client = new EasyPostClient(process.env.PERSONAL_TEST_KEY) // personal testKey

/* IMPORT DAD TOOL */
import { random } from "dad-tool" // see https://github.com/Justintime50/dad-node

// CREATE DAD ADDRESSES
const unitedstates1 = await random("US_UT")
const unitedstates2 = await random("US_CA")
const unitedstates3 = await random("US_AZ")
const canada1 = await random("CA_BC")
const canada2 = await random("CA_BC")
const australia1 = await random("AU_VT")
const australia2 = await random("AU_VT")
const unitedkingdom1 = await random("EU_UK")
const unitedkingdom2 = await random("EU_UK")
const spain1 = await random("EU_ES")
const spain2 = await random("EU_ES")


//============create address============
try {
  const address = await client.Address.create({
    name: "Example Name",
    company: "Example Company",
    street1: canada1.street1,
    street2: canada1.street2,
    city: canada1.city,
    state: canada1.state,
    zip: canada1.zip,
    country: canada1.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345',
    // verify: ['delivery']
  });

  console.log(address);
} catch (error) {
  console.log("   ")
  console.log("CREATE ADDRESS ERROR:")
  console.log(error)
}