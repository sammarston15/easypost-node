/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"
import {
    logRateErrors,
    logShipmentRates,
    getAdminLink,
    getLabelUrl,
} from "../utils/shipmentUtils.js"

// const client = new EasyPostClient(process.env.PROD_KEY) // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey
// const client = new EasyPostClient(process.env.CHILD_TEST_KEY) // child testKey
// const client = new EasyPostClient(process.env.PERSONAL_TEST_KEY) // personal testKey

// bring in the data from the misc.json file
import data from "../misc.json" with { type: "json" }
let ship = data

// handle params_full that has a "shipment" object inside of it
if (ship.shipment) {
    ship = ship.shipment
}

// DELETES ALL THE NECESSARY ATTRIBUTES
if (ship.to_address) {
    delete ship.to_address.id
    delete ship.to_address.mode
    delete ship.to_address.updated_at
    delete ship.to_address.created_at
    delete ship.to_address.carrier_facility
    delete ship.to_address.verifications
}

if (ship.from_address) {
    delete ship.from_address.id
    delete ship.from_address.created_at
    delete ship.from_address.mode
    delete ship.from_address.updated_at
}

if (ship.parcel) {
    delete ship.parcel.id
    delete ship.parcel.created_at
    delete ship.parcel.mode
    delete ship.parcel.updated_at
}

if (ship.rates) {
    delete ship.rates
}

if (ship.selected_rate) {
    delete ship.selected_rate
}

if (ship.parcel?.predefined_package === null) {
    delete ship.parcel.predefined_package
}

if (ship.customs_info) {
    delete ship.customs_info.id
    delete ship.customs_info.created_at
    delete ship.customs_info.mode
    delete ship.customs_info.updated_at
    delete ship.customs_info.object
    for (let i = 0; i < ship.customs_info.customs_items.length; i++) {
        delete ship.customs_info.customs_items[i].id
        delete ship.customs_info.customs_items[i].created_at
        delete ship.customs_info.customs_items[i].mode
        delete ship.customs_info.customs_items[i].updated_at
        delete ship.customs_info.customs_items[i].object
        if (ship.customs_info.customs_items[i].currency === null) {
            delete ship.customs_info.customs_items[i].currency
        }

        // convert these values to a Number rather than a string to avoid the "Invalid prop `customs_info`..." error
        ship.customs_info.customs_items[i].quantity = parseFloat(
            ship.customs_info.customs_items[i].quantity,
        )
        ship.customs_info.customs_items[i].value = parseFloat(
            ship.customs_info.customs_items[i].value,
        )
        ship.customs_info.customs_items[i].weight = parseFloat(
            ship.customs_info.customs_items[i].weight,
        )
    }
}

// extras (depending on the shipment and the options)
// if (ship.options.payment) {
//     delete ship.options.payment
// }
// if (ship.options.bill_receiver_account) {
//     delete ship.options.bill_receiver_account
// }
// if (ship.options.bill_receiver_postal_code) {
//     delete ship.options.bill_receiver_postal_code
// }

// ADDITIONAL OPTIONS
// ship.options.label_format = "PDF"
// delete ship.options.label_size
// ship.options.cost_center = "easypost1"
// ship.reference = "easypost ref"
// ship.customs_info.contents_explanation = "example explanation"
// ship.customs_info.customs_items[0].description = "example description"
// ship.customs_info.customs_items[1].description = "example description"
// ship.customs_info.customs_items[2].description = "example description"
// ship.options.importer_address_id = "adr_xxxxx"

// console.log('ship', JSON.stringify(ship, null, 2))

// CREATE SHIPMENT
try {
    console.log(`attempting to recreate ${ship.id ? ship.id : "shipment"}...`)
    console.log("   ")
    console.log("   ")

    const shipment = await client.Shipment.create({
        is_return: ship.is_return,
        to_address: ship.to_address,
        from_address: ship.from_address,
        // return_address: ship.return_address,
        // return_address: {
        //   name: "Dr. Steve Brule",
        //   street1: "179 N Harbor Dr",
        //   city: "Redondo Beach",
        //   state: "CA",
        //   zip: "90277",
        //   country: "US",
        //   email: "dr_steve_brule@gmail.com",
        //   phone: "4155559999",
        // },
        // buyer_address: ship.buyer_address,
        parcel: ship.parcel,
        customs_info: ship.customs_info,
        options: ship.options,
        tax_identifiers: ship.tax_identifiers,
        options: {
            print_custom_1: "printCustom1",
            print_custom_2: "printCustom2",
            // print_custom_2_code: "PO",
            print_custom_3: "printCustom3",
            handling_instructions: "handling instructions",
            // print_custom_3_code: "RMA",
            // print_custom_1_barcode: true,
            // print_custom_2_barcode: true,
            // label_format: 'PNG',
            // label_size: "4x6",
            // label_date: "2022-06-25T15:00:00Z"
            // incoterm: "DAP",
            // invoice_number: '123456789'
            // importer_address_id: 'adr_f82f2dee2b1a11ee98b4ac1f6bc539aa',
            // payment: {
            //   type: "THIRD_PARTY",
            //   account: "510087780",
            //   country: "US",
            //   postal_code: "12345"
            // },
            // duty_payment_account: {
            //   type: "THIRD_PARTY",
            //   account: "510087780",
            //   country: "US",
            //   postal_code: "12345"
            // }
            // dropoff_max_datetime: '2021-05-20T15:00:00Z',
            // delivery_confirmation: "NO_SIGNATURE",
            // commercial_invoice_format: "PNG",
            //   delivery_min_datetime: '2022-05-10 10:30:00',
            //   delivery_max_datetime: '2022-05-10 10:30:00',
            //   pickup_min_datetime: '2022-05-10 10:30:00',
            //   pickup_max_datetime: '2022-05-10 10:30:00',
            // customs_broker_address_id: toAddress.id
            // hazmat: "LITHIUM",
            // hazmat: "PI966-II",
        },
        carrier_accounts: [
            // process.env.PERSONAL_CANADA_POST_DEFAULT,
            // process.env.PERSONAL_UPS_DAP,
            // process.env.PERSONAL_CANADA_POST_DEFAULT,
            // process.env.BYOCA_FEDEX,
            // process.env.BYOCA_CANADA_POST,
            "ca_77b71b3e7e834a94838c2d7c40c5ca03",
        ],
        // service: 'First',
        reference: crypto.randomUUID(),
        // invoice_number: "invoice number",
    })

    // log entire shipment object
    console.log(JSON.stringify(shipment, null, 2))

    // log any rate errors
    logRateErrors(shipment)

    // log any rates
    logShipmentRates(shipment)

    // log shipment ID & admin link
    getAdminLink(shipment)

    //============buy shipment by lowest rate============
    if (shipment?.rates?.length > 0) {
        try {
            console.log("   ")
            console.log("   ")
            console.log(`attempting to purchase ${shipment.id}...`)
            const boughtShipment = await client.Shipment.buy(
                shipment.id, // shipment id
                shipment.lowestRate(), // shipment rate
                null, // insurance
                null, // carbon offset
                // process.env.TEST_ENDSHIPPER_ID_EXAMPLE // end shipper
            )
            console.log(
                boughtShipment?.id
                    ? boughtShipment.id
                    : JSON.stringify(boughtShipment, null, 2),
            )
            // refund the shipment if it was purchased
            if (
                boughtShipment.id &&
                boughtShipment.selected_rate &&
                boughtShipment.tracking_code
            ) {
                setTimeout(async () => {
                    console.log("   ")
                    console.log(
                        `attempting to refund ${boughtShipment.id}...\n`,
                    )
                    const refund = await client.Refund.create({
                        carrier: boughtShipment.selected_rate.carrier,
                        tracking_codes: [boughtShipment.tracking_code],
                    })

                    console.log(refund)
                }, 5000) // wait 5 seconds before attempting refund
            }
        } catch (error) {
            console.log("   ")
            console.log("SHIPMENT BUY ERROR:")
            console.log(error)

            // print full json
            console.log(`\n\nSTRINGIFIED:\n${JSON.stringify(error, null, 2)}`)
        }
    } else {
        console.log(
            "\nNo purchase attempted because there were no rates available for this shipment.\n",
        )
    }

    //============buy shipment by carrier name/service type============
    // try {
    //     console.log("   ")
    //     console.log("   ")
    //     console.log(`attempting to purchase ${shipment.id}...`)
    //     const boughtShipment = await client.Shipment.buy(
    //         shipment.id,
    //         shipment.lowestRate(["UPS"], ["Ground"])
    //     )
    //     console.log(JSON.stringify(boughtShipment, null, 2))
    //     console.log(`\n\nShipment ID: ${boughtShipment.id}`)
    // } catch (error) {
    //     console.log("   ")
    //     console.log("SHIPMENT BUY ERROR:")
    //     console.log(error)
    // }
} catch (error) {
    console.log("   ")
    console.log("SHIPMENT CREATE ERROR:")
    console.log(error)
}

// ******** create a way to log shipment and/or errors into a file, potential code example below
// fs.writeFileSync('/Users/smarston/Downloads/test_canada_post_response_3.txt', JSON.stringify(shipment, null, 4));
