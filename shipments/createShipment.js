/*  THIS COMPONENT IS SET UP TO USE THE DAD TOOL FOR THE ADDRESSES - CHANGE THE DAD ADDRESSES AS NECESSARY DEPENDING ON THE ORIGIN/DESTINATION COMBINATION YOU ARE TRYING TO TEST */

/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"

// const client = new EasyPostClient(process.env.PROD_KEY) // prodKey
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

// CREATE TO ADDRESS
const toAddress = await client.Address.create({
    name: "Example Destination Name",
    company: "Example Destination Company",
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
})

// CREATE FROM ADDRESS
const fromAddress = await client.Address.create({
    name: "Example Origin Name",
    company: "Example Origin Company",
    street1: australia1.street1,
    street2: australia1.street2,
    city: australia1.city,
    state: australia1.state,
    zip: australia1.zip,
    country: australia1.country,
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

// CREATE BUYER ADDRESS
const buyerAddress = await client.Address.create({
    name: "Example Buyer Name",
    company: "Example Buyer Company",
    street1: unitedstates3.street1,
    street2: unitedstates3.street2,
    city: unitedstates3.city,
    state: unitedstates3.state,
    zip: unitedstates3.zip,
    country: unitedstates3.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345'
})

// CREATE PARCEL
const parcel = await client.Parcel.create({
    length: 4,
    width: 8.5,
    height: 1,
    // predefined_package: 'Flat',
    weight: 10,
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
    contents_explanation: "#1 dad t-shirts size large", // general notes section for contents
    restriction_type: "none",
    // restriction_comments: '',
    non_delivery_option: "return",

    /* customs_items can be passed in as instances or ids.
     *  if the item does not have an id, it will be created. */
    customs_items: [
        // customsItem,
        await client.CustomsItem.create({
            description: "#1 dad t-shirts size large",
            quantity: 2,
            weight: 5,
            value: 23,
            hs_tariff_number: "6103.22.00",
            origin_country: "US",
            code: "1234",
        }),
    ],
})

// CREATE SHIPMENT
try {
    console.log("attempting to create shipment...\n")

    const shipment = await client.Shipment.create({
        // is_return: true,
        to_address: toAddress,
        // to_address: {
        //     name: "Example Destination Name",
        //     company: "Example Destination Company",
        //     street1: "Jan Van Zutphenstraat 267, 1069RR, Amsterdam, Noord Holland",
        //     street2: "",
        //     city: "Amsterdam",
        //     state: "Noord Holland",
        //     zip: "1069RR",
        //     country: "NL",
        //     phone: "415-528-7555",
        //     email: "example@email.com",
        //     // federal_tax_id: '12345',
        //     // verify: ['delivery']
        // },
        from_address: fromAddress,
        // from_address: {
        //     name: "Example Origin Name",
        //     company: "Example Origin Company", 
        //     street1: "Puchbacherstraße",
        //     street2: "",
        //     city: "Maria Lankowitz",
        //     state: "",
        //     zip: "8591",
        //     country: "AT", 
        //     phone: "415-528-7555",
        //     email: "example@email.com",
        //     // federal_tax_id: '12345'
        // },
        // return_address: returnAddress,
        // buyer_address: buyerAddress,
        // buyer_address: {id: process.env.PROD_IMPORTER_ADDRESS},
        parcel: parcel,
        customs_info: customsInfo,
        options: {
            print_custom_1: "printCustom1",
            // print_custom_2_code: "PO",
            // print_custom_2: "printCustom2",
            // print_custom_2_code: "PO",
            // print_custom_3: "printCustom3",
            // print_custom_3_code: "RMA",
            // print_custom_1_barcode: true,
            // print_custom_2_barcode: true,
            // label_format: 'PNG',
            // label_size: "4x6",
            // label_date: new Date().toISOString(),
            // incoterm: "DDP",
            // invoice_number: '123456789'
            // importer_address_id: process.env.PROD_IMPORTER_ADDRESS,
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
            // delivery_confirmation: "adult_signature",
            // commercial_invoice_format: "PNG",
            //   delivery_min_datetime: '2022-05-10 10:30:00',
            //   delivery_max_datetime: '2022-05-10 10:30:00',
            //   pickup_min_datetime: '2022-05-10 10:30:00',
            //   pickup_max_datetime: '2022-05-10 10:30:00',
            // customs_broker_address_id: toAddress.id
        },
        carrier_accounts: [
            // process.env.PERSONAL_CANADA_POST_DEFAULT,
            // process.env.PERSONAL_UPS_DAP,
            // process.env.PERSONAL_CANADA_POST_DEFAULT,
            process.env.BYOCA_FEDEX,
            // process.env.BYOCA_CANADA_POST,
            // process.env.WALLET_USPS,
            // process.env.TEST_USPS_SHIP,
            // process.env.FEDEX_CROSS_BORDER,
            // "ca_b8104905847b4d8b815359d8f5bba143",
        ],
        // service: 'UPSStandard',
        reference: `sam-${crypto.randomUUID().slice(0, 8)}`,
    })

    // log entire shipment object
    // console.log(JSON.stringify(shipment, null, 2))

    // log any rate errors
    if (shipment.messages.length > 0) {
        console.log("  ")
        console.log(`RATE ERRORS for ${shipment.id}:`)
        for (const message in shipment.messages) {
            console.log({
                type: shipment.messages[message].type || "N/A",
                carrier: shipment.messages[message].carrier || "N/A",
                message: shipment.messages[message].message || "N/A",
                carrier_account_id:
                    shipment.messages[message].carrier_account_id || "N/A",
            })
        }
    } else {
        console.log("No rate errors.\n")
    }

    // log any rates
    if (shipment.rates.length > 0) {
        console.log("   ")
        console.log(`RATES for ${shipment.id}:`)
        for (const rate in shipment.rates) {
            console.log(
                `${shipment.rates[rate].carrier} - ${shipment.rates[rate].service} - ${shipment.rates[rate].rate}`,
            )
        }

        //============buy shipment by lowest rate============
        try {
            console.log(`\nattempting to purchase ${shipment.id}...\n`)
            const boughtShipment = await client.Shipment.buy(
                shipment.id, // shipment id
                shipment.lowestRate(), // shipment rate
                null, // insurance
                null, // carbon offset
                // process.env.TEST_ENDSHIPPER_ID_EXAMPLE // end shipper
            )
            console.log(
                "Successfully purchased shipment: ",
                boughtShipment.id || JSON.stringify(boughtShipment, null, 2),
            )

            // refund the shipment if it was purchased
            if (
                boughtShipment.id &&
                boughtShipment.selected_rate &&
                boughtShipment.tracking_code
            ) {
                setTimeout(async () => {
                    console.log(
                        `\nattempting to refund ${boughtShipment.id}...\n`,
                    )
                    const refund = await client.Refund.create({
                        carrier: boughtShipment.selected_rate.carrier,
                        tracking_codes: [boughtShipment.tracking_code],
                    })

                    console.log(refund)
                }, 5000) // wait 5 seconds before attempting refund
            }
        } catch (error) {
            console.log("SHIPMENT BUY ERROR:")
            console.log(error)
        }

        //============buy shipment by carrier name/service type============
        // try {
        //     const boughtShipment = await client.Shipment.buy(
        //         shipment.id,
        //         shipment.lowestRate(["UPS"], ["UPSStandard"])
        //     )
        //     console.log('Successfully purchased shipment: ')
        //     console.log(boughtShipment.id || JSON.stringify(boughtShipment, null, 2))
        // } catch (error) {
        //     console.log("   ")
        //     console.log("SHIPMENT BUY ERROR:")
        //     console.log(error)
        // }
    } else {
        console.log("No rates available for this shipment.\n")
    }

    console.log(`${shipment.id}\n`)
} catch (error) {
    console.log("   ")
    console.log("SHIPMENT CREATE ERROR:")
    console.log(error)
}
