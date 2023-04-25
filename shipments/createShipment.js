/*  THIS COMPONENT IS SET UP TO USE THE DAD TOOL FOR THE ADDRESSES - CHANGE THE DAD ADDRESSES AS NECESSARY DEPENDING ON THE ORIGIN/DESTINATION COMBINATION YOU ARE TRYING TO TEST */

/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey
// const client = new EasyPostClient(process.env.DISABLED_TEST_KEY);     // DISABLED_TEST_KEY to test the error that comes back
// const client = new EasyPostClient(process.env.RICK_CARTER_PROD_KEY);     // RICK_CARTER_PROD_KEY

/* IMPORT DAD TOOL */
import dad from "dad-tool"

// CREATE DAD ADDRESSES
const unitedstates1 = dad.random("US_AZ")
const unitedstates2 = dad.random("US_CA")
const canada1 = dad.random("CA_BC")
const canada2 = dad.random("CA_BC")
const australia1 = dad.random("AU_VT")
const australia2 = dad.random("AU_VT")
const unitedkingdom1 = dad.random("EU_UK")
const unitedkingdom2 = dad.random("EU_UK")
const spain1 = dad.random("EU_ES")
const spain2 = dad.random("EU_ES")

// CREATE TO ADDRESS
const toAddress = await client.Address.create({
    name: "Example Destination Name",
    company: "Example Destination Company",
    street1: unitedstates1.street1,
    street2: unitedstates1.street2,
    city: unitedstates1.city,
    state: unitedstates1.state,
    zip: unitedstates1.zip,
    country: unitedstates1.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345',
    // verify: ['delivery']
})

// CREATE FROM ADDRESS
const fromAddress = await client.Address.create({
    name: "Example Origin Name",
    company: "Example Origin Company",
    street1: unitedstates2.street1,
    street2: unitedstates2.street2,
    city: unitedstates2.city,
    state: unitedstates2.state,
    zip: unitedstates2.zip,
    country: unitedstates2.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345'
})

// CREATE RETURN ADDRESS
const returnAddress = await client.Address.create({
    name: "Example Return Name",
    company: "Example Return Company",
    street1: unitedstates2.street1,
    street2: unitedstates2.street2,
    city: unitedstates2.city,
    state: unitedstates2.state,
    zip: unitedstates2.zip,
    country: unitedstates2.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345'
})

// CREATE PARCEL
const parcel = await client.Parcel.create({
    length: 20.2,
    width: 10.9,
    height: 5,
    // predefined_package: 'Parcel',
    weight: 65,
})

// CREATE CUSTOMS INFO
const customsItem = await client.CustomsItem.create({
    description: "T-shirt",
    quantity: 1,
    value: 10,
    weight: 5,
    hs_tariff_number: "123456",
    origin_country: "us",
    code: "1234",
})

const customsInfo = await client.CustomsInfo.create({
    eel_pfc: "NOEEI 30.37(a)",
    customs_certify: true,
    customs_signer: "Steve Brule",
    contents_type: "merchandise",
    contents_explanation: "this is the general notes section",
    restriction_type: "none",
    // restriction_comments: '',
    non_delivery_option: "return",

    /* customs_items can be passed in as instances or ids.
     *  if the item does not have an id, it will be created. */
    customs_items: [
        customsItem,
        await client.CustomsItem.create({
            description: "Sweet shirts",
            quantity: 2,
            weight: 5,
            value: 23,
            hs_tariff_number: "654321",
            origin_country: "US",
            code: "1234",
        }),
    ],
})

// CREATE SHIPMENT
try {
    console.log("attempting to create shipment...")
    console.log("   ")
    console.log("   ")

    const shipment = await client.Shipment.create({
        // is_return: true,
        to_address: toAddress,
        from_address: fromAddress,
        // return_address: returnAddress,
        parcel: parcel,
        // customs_info: customsInfo,
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
