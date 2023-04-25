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

// bring in the data from the misc.json file
import ship from '../misc.json' assert { type: 'json' }


// DELETES ALL THE UNESSCESARY ATTRIBUTES
if (ship.to_address) {
    delete ship.to_address.id
    delete ship.to_address.mode
    delete ship.to_address.updated_at
    delete ship.to_address.created_at
    delete ship.to_address.carrier_facility
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

if (ship.parcel.predefined_package === null) {
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
            ship.customs_info.customs_items[i].quantity
        )
        ship.customs_info.customs_items[i].value = parseFloat(
            ship.customs_info.customs_items[i].value
        )
        ship.customs_info.customs_items[i].weight = parseFloat(
            ship.customs_info.customs_items[i].weight
        )
    }
}

// extras (depending on the shipment and the options)
if (ship.options.payment) {
    delete ship.options.payment
}
if (ship.options.bill_receiver_account) {
    delete ship.options.bill_receiver_account
}
if (ship.options.bill_receiver_postal_code) {
    delete ship.options.bill_receiver_postal_code
}

// ADDITIONAL OPTIONS
// ship.options.label_format = "PNG"
// ship.options.cost_center = "easypost1"
// ship.reference = "easypost ref"
// ship.customs_info.contents_explanation = "example explanation"
// ship.customs_info.customs_items[0].description = "example description"
// ship.customs_info.customs_items[1].description = "example description"
// ship.customs_info.customs_items[2].description = "example description"

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
        // buyer_address: ship.buyer_address,
        parcel: ship.parcel,
        customs_info: ship.customs_info,
        options: {
            print_custom_1: "printCustom1",
            // print_custom_2: "printCustom2",
            // print_custom_2_code: "PO",
            // print_custom_3: "printCustom3",
            // print_custom_3_code: "RMA",
            // print_custom_1_barcode: true,
            // print_custom_2_barcode: true,
            // label_format: 'PNG',
            // label_size: "4x6",
            // label_date: "2022-06-25T15:00:00Z"
            // incoterm: "DAP",
            // invoice_number: '123456789'
            // importer_address_id: 'adr_cac53236bc4e49edbc4e07146766998d',
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
        },
        carrier_accounts: [process.env.USPS],
        // service: 'First',
        reference: crypto.randomUUID(),
    })

    console.log(JSON.stringify(shipment, null, 2))

    //============buy shipment by lowest rate============
    try {
        console.log("   ")
        console.log("   ")
        console.log(`attempting to purchase ${shipment.id}...`)
        const boughtShipment = await client.Shipment.buy(
            shipment.id,
            shipment.lowestRate()
        )
        console.log(JSON.stringify(boughtShipment, null, 2))
    } catch (error) {
        console.log("   ")
        console.log("SHIPMENT BUY ERROR:")
        console.log(error)
    }

    //============buy shipment by carrier name/service type============
    // try {
    //     const boughtShipment = await client.Shipment.buy(
    //         shipment.id,
    //         shipment.lowestRate(["USPS"], ["First"])
    //     )
    //     console.log(JSON.stringify(boughtShipment, null, 2))
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
