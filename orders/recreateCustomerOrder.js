require('dotenv').config();


const Easypost = require('@easypost/api');
const apiKey = process.env.testKey;
// const apiKey = process.env.prodKey;
const api = new Easypost(apiKey);


// Assign JSON data to variable
const data = (

  // ENTER JSON DATA BELOW
  //===============================================================//

  {
    "object": "Order",
    "public_id": "order_bbbaf2b4a9a4476aa3d3cac44293b811",
    "user": {
      "id": 345977,
      "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
      "object": "User",
      "parent_id": null,
      "billing_user_id": 345977,
      "name": "Michaele Pauwen",
      "email": "michaele@kalonstudios.com",
      "phone_number": "3233176826",
      "balance": "$107.29540",
      "price_per_shipment": "0.00000",
      "disabled": false,
      "disabled_at": null,
      "created_at": "2019-01-14T22:49:42Z",
      "updated_at": "2019-03-15T19:18:36Z",
      "watch": false,
      "source": null,
      "stripe_customer": {
        "id": 14642
      },
      "user_flag": {
        "id": 94029
      }
    },
    "user_id": 345977,
    "mode": "production",
    "is_return": false,
    "reference": null,
    "options": {
      "currency": "USD",
      "payment": {
        "type": "SENDER"
      }
    },
    "messages": [
      {
        "carrier": "UPS",
        "carrier_account_id": "ca_1c4f2c36b90a44d5a9721a0be6cdf9f8",
        "type": "rate_message",
        "message": "UPS multi-shipment rate includes this shipment."
      }
    ],
    "created_at": "2021-10-29T02:34:42Z",
    "updated_at": "2021-10-29T02:34:44Z",
    "from_address": {
      "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
      "object": "Address",
      "created_at": "2021-10-28T23:41:36+00:00",
      "updated_at": "2021-10-28T23:41:36+00:00",
      "name": "James Mahoski",
      "company": "Kalon Studios",
      "street1": "650 Houtztown Rd.",
      "street2": "null",
      "city": "Myerstown",
      "state": "PA",
      "zip": "17067",
      "country": "US",
      "phone": "71793351151041",
      "email": null,
      "mode": "production",
      "carrier_facility": null,
      "residential": false,
      "federal_tax_id": null,
      "state_tax_id": null,
      "verifications": []
    },
    "from_address_id": 9564199276,
    "to_address": {
      "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
      "object": "Address",
      "created_at": "2021-10-28T23:41:37+00:00",
      "updated_at": "2021-10-28T23:41:37+00:00",
      "name": null,
      "company": "MATTHEW ONEILL",
      "street1": "10929 SUNRISE DR NE",
      "street2": "NULL",
      "city": "BAINBRIDGE ISLAND",
      "state": "WA",
      "zip": "98110-3315",
      "country": "US",
      "phone": "6179539993",
      "email": null,
      "mode": "production",
      "carrier_facility": null,
      "residential": true,
      "federal_tax_id": null,
      "state_tax_id": null,
      "verifications": [
        {
          "id": null,
          "address_id": null,
          "name": "delivery",
          "success": true,
          "results": null,
          "created_at": null,
          "updated_at": null,
          "details": {
            "carrier_route": "R010",
            "latitude": 47.66244,
            "longitude": -122.5103,
            "time_zone": "America/Los_Angeles"
          },
          "user_id": null
        }
      ]
    },
    "to_address_id": 9564199312,
    "buyer_address": {
      "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
      "object": "Address",
      "created_at": "2021-10-28T23:41:37+00:00",
      "updated_at": "2021-10-28T23:41:37+00:00",
      "name": null,
      "company": "MATTHEW ONEILL",
      "street1": "10929 SUNRISE DR NE",
      "street2": "NULL",
      "city": "BAINBRIDGE ISLAND",
      "state": "WA",
      "zip": "98110-3315",
      "country": "US",
      "phone": "6179539993",
      "email": null,
      "mode": "production",
      "carrier_facility": null,
      "residential": true,
      "federal_tax_id": null,
      "state_tax_id": null,
      "verifications": [
        {
          "id": null,
          "address_id": null,
          "name": "delivery",
          "success": true,
          "results": null,
          "created_at": null,
          "updated_at": null,
          "details": {
            "carrier_route": "R010",
            "latitude": 47.66244,
            "longitude": -122.5103,
            "time_zone": "America/Los_Angeles"
          },
          "user_id": null
        }
      ]
    },
    "buyer_address_id": 9564199312,
    "return_address": {
      "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
      "object": "Address",
      "created_at": "2021-10-28T23:41:36+00:00",
      "updated_at": "2021-10-28T23:41:36+00:00",
      "name": "James Mahoski",
      "company": "Kalon Studios",
      "street1": "650 Houtztown Rd.",
      "street2": "null",
      "city": "Myerstown",
      "state": "PA",
      "zip": "17067",
      "country": "US",
      "phone": "71793351151041",
      "email": null,
      "mode": "production",
      "carrier_facility": null,
      "residential": false,
      "federal_tax_id": null,
      "state_tax_id": null,
      "verifications": []
    },
    "return_address_id": 9564199276,
    "customs_info": null,
    "customs_info_id": null,
    "id": 307113010,
    "shipments": [
      {
        "created_at": "2021-10-29T02:34:42Z",
        "is_return": false,
        "messages": [],
        "mode": "production",
        "options": {
          "print_custom_1": "16261",
          "delivery_confirmation": "SIGNATURE",
          "currency": "USD",
          "print_custom": [
            {
              "value": "16261"
            }
          ],
          "payment": {
            "type": "SENDER"
          },
          "date_advance": 0
        },
        "reference": null,
        "status": "unknown",
        "tracking_code": null,
        "updated_at": "2021-10-29T02:34:42Z",
        "batch_id": null,
        "batch_status": null,
        "batch_message": null,
        "customs_info": null,
        "from_address": {
          "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
          "object": "Address",
          "created_at": "2021-10-28T23:41:36+00:00",
          "updated_at": "2021-10-28T23:41:36+00:00",
          "name": "James Mahoski",
          "company": "Kalon Studios",
          "street1": "650 Houtztown Rd.",
          "street2": "null",
          "city": "Myerstown",
          "state": "PA",
          "zip": "17067",
          "country": "US",
          "phone": "71793351151041",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": false,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {}
        },
        "insurance": null,
        "order_id": "order_bbbaf2b4a9a4476aa3d3cac44293b811",
        "parcel": {
          "id": "prcl_194662e5f58b4d3bab3392ac400fd670",
          "object": "Parcel",
          "created_at": "2021-10-29T02:34:42Z",
          "updated_at": "2021-10-29T02:34:42Z",
          "length": 54,
          "width": 30,
          "height": 7,
          "predefined_package": null,
          "weight": 1120,
          "mode": "production"
        },
        "postage_label": null,
        "rates": [
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "ParcelSelect",
            "carrier": "USPS",
            "rate": "217.90",
            "currency": "USD",
            "retail_rate": "217.90",
            "retail_currency": "USD",
            "list_rate": "217.90",
            "list_currency": "USD",
            "delivery_days": 7,
            "delivery_date": null,
            "delivery_date_guaranteed": false,
            "est_delivery_days": 7,
            "shipment_id": "shp_e5eb34778611458d860c0719186b10ea",
            "carrier_account_id": "ca_5efdd4eefaf348d8a23ba9004f31b31c",
            "id": "rate_38b8af5ae2c84feea0b4d828eaf542ca"
          },
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "3DaySelect",
            "carrier": "UPS",
            "rate": "852.98",
            "currency": "USD",
            "retail_rate": "728.42",
            "retail_currency": "USD",
            "list_rate": "823.80",
            "list_currency": "USD",
            "delivery_days": 3,
            "delivery_date": "2021-11-03T23:00:00Z",
            "delivery_date_guaranteed": true,
            "est_delivery_days": 3,
            "shipment_id": "shp_e5eb34778611458d860c0719186b10ea",
            "carrier_account_id": "ca_1c4f2c36b90a44d5a9721a0be6cdf9f8",
            "id": "rate_bc93f7fae1614d8db1806fcd37a1efe7"
          },
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "Ground",
            "carrier": "UPS",
            "rate": "259.69",
            "currency": "USD",
            "retail_rate": "315.71",
            "retail_currency": "USD",
            "list_rate": "244.15",
            "list_currency": "USD",
            "delivery_days": 5,
            "delivery_date": "2021-11-05T23:00:00Z",
            "delivery_date_guaranteed": true,
            "est_delivery_days": 5,
            "shipment_id": "shp_e5eb34778611458d860c0719186b10ea",
            "carrier_account_id": "ca_1c4f2c36b90a44d5a9721a0be6cdf9f8",
            "id": "rate_599552fab41a4be1943b75af0ef10e3c"
          },
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "NextDayAirSaver",
            "carrier": "UPS",
            "rate": "1560.36",
            "currency": "USD",
            "retail_rate": "1318.96",
            "retail_currency": "USD",
            "list_rate": "1537.44",
            "list_currency": "USD",
            "delivery_days": 1,
            "delivery_date": "2021-11-01T23:00:00Z",
            "delivery_date_guaranteed": true,
            "est_delivery_days": 1,
            "shipment_id": "shp_e5eb34778611458d860c0719186b10ea",
            "carrier_account_id": "ca_1c4f2c36b90a44d5a9721a0be6cdf9f8",
            "id": "rate_8315a781391b4aa580c178e23a9d6651"
          },
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "NextDayAir",
            "carrier": "UPS",
            "rate": "1575.08",
            "currency": "USD",
            "retail_rate": "1331.40",
            "retail_currency": "USD",
            "list_rate": "1545.84",
            "list_currency": "USD",
            "delivery_days": 1,
            "delivery_date": "2021-11-01T12:00:00Z",
            "delivery_date_guaranteed": true,
            "est_delivery_days": 1,
            "shipment_id": "shp_e5eb34778611458d860c0719186b10ea",
            "carrier_account_id": "ca_1c4f2c36b90a44d5a9721a0be6cdf9f8",
            "id": "rate_d7c958f2be334bcd89376ce9c606522c"
          },
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "2ndDayAir",
            "carrier": "UPS",
            "rate": "1223.06",
            "currency": "USD",
            "retail_rate": "948.84",
            "retail_currency": "USD",
            "list_rate": "1162.76",
            "list_currency": "USD",
            "delivery_days": 2,
            "delivery_date": "2021-11-02T23:00:00Z",
            "delivery_date_guaranteed": true,
            "est_delivery_days": 2,
            "shipment_id": "shp_e5eb34778611458d860c0719186b10ea",
            "carrier_account_id": "ca_1c4f2c36b90a44d5a9721a0be6cdf9f8",
            "id": "rate_189b9c4cc07a42ebaee4bb07ad2d5276"
          }
        ],
        "refund_status": null,
        "scan_form": null,
        "selected_rate": null,
        "tracker": null,
        "to_address": {
          "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
          "object": "Address",
          "created_at": "2021-10-28T23:41:37+00:00",
          "updated_at": "2021-10-28T23:41:37+00:00",
          "name": null,
          "company": "MATTHEW ONEILL",
          "street1": "10929 SUNRISE DR NE",
          "street2": "NULL",
          "city": "BAINBRIDGE ISLAND",
          "state": "WA",
          "zip": "98110-3315",
          "country": "US",
          "phone": "6179539993",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": true,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {
            "delivery": {
              "success": true,
              "errors": [],
              "details": {
                "latitude": 47.66244,
                "longitude": -122.5103,
                "time_zone": "America/Los_Angeles"
              }
            }
          }
        },
        "usps_zone": 8,
        "return_address": {
          "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
          "object": "Address",
          "created_at": "2021-10-28T23:41:36+00:00",
          "updated_at": "2021-10-28T23:41:36+00:00",
          "name": "James Mahoski",
          "company": "Kalon Studios",
          "street1": "650 Houtztown Rd.",
          "street2": "null",
          "city": "Myerstown",
          "state": "PA",
          "zip": "17067",
          "country": "US",
          "phone": "71793351151041",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": false,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {}
        },
        "buyer_address": {
          "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
          "object": "Address",
          "created_at": "2021-10-28T23:41:37+00:00",
          "updated_at": "2021-10-28T23:41:37+00:00",
          "name": null,
          "company": "MATTHEW ONEILL",
          "street1": "10929 SUNRISE DR NE",
          "street2": "NULL",
          "city": "BAINBRIDGE ISLAND",
          "state": "WA",
          "zip": "98110-3315",
          "country": "US",
          "phone": "6179539993",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": true,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {
            "delivery": {
              "success": true,
              "errors": [],
              "details": {
                "latitude": 47.66244,
                "longitude": -122.5103,
                "time_zone": "America/Los_Angeles"
              }
            }
          }
        },
        "forms": [],
        "fees": [],
        "id": "shp_e5eb34778611458d860c0719186b10ea",
        "object": "Shipment",
        "_internal": {
          "id": 3273774078,
          "public_id": "shp_e5eb34778611458d860c0719186b10ea",
          "insurance_value_usd": null,
          "user": {
            "id": 345977,
            "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
            "object": "User",
            "parent_id": null,
            "billing_user_id": 345977,
            "name": "Michaele Pauwen",
            "email": "michaele@kalonstudios.com",
            "phone_number": "3233176826",
            "balance": "$107.29540",
            "price_per_shipment": "0.00000",
            "disabled": false,
            "disabled_at": null,
            "created_at": "2019-01-14T22:49:42Z",
            "updated_at": "2019-03-15T19:18:36Z",
            "watch": false,
            "source": null,
            "stripe_customer": {
              "id": 14642
            },
            "user_flag": {
              "id": 94029
            }
          },
          "user_id": 345977,
          "batch_id": null,
          "to_address": {
            "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
            "object": "Address",
            "created_at": "2021-10-28T23:41:37+00:00",
            "updated_at": "2021-10-28T23:41:37+00:00",
            "name": null,
            "company": "MATTHEW ONEILL",
            "street1": "10929 SUNRISE DR NE",
            "street2": "NULL",
            "city": "BAINBRIDGE ISLAND",
            "state": "WA",
            "zip": "98110-3315",
            "country": "US",
            "phone": "6179539993",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": true,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [
              {
                "id": null,
                "address_id": null,
                "name": "delivery",
                "success": true,
                "results": null,
                "created_at": null,
                "updated_at": null,
                "details": {
                  "carrier_route": "R010",
                  "latitude": 47.66244,
                  "longitude": -122.5103,
                  "time_zone": "America/Los_Angeles"
                },
                "user_id": null
              }
            ],
            "_internal": {
              "id": 9564199312,
              "public_id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "to_address_id": 9564199312,
          "from_address": {
            "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
            "object": "Address",
            "created_at": "2021-10-28T23:41:36+00:00",
            "updated_at": "2021-10-28T23:41:36+00:00",
            "name": "James Mahoski",
            "company": "Kalon Studios",
            "street1": "650 Houtztown Rd.",
            "street2": "null",
            "city": "Myerstown",
            "state": "PA",
            "zip": "17067",
            "country": "US",
            "phone": "71793351151041",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": false,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [],
            "_internal": {
              "id": 9564199276,
              "public_id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "from_address_id": 9564199276,
          "return_address": {
            "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
            "object": "Address",
            "created_at": "2021-10-28T23:41:36+00:00",
            "updated_at": "2021-10-28T23:41:36+00:00",
            "name": "James Mahoski",
            "company": "Kalon Studios",
            "street1": "650 Houtztown Rd.",
            "street2": "null",
            "city": "Myerstown",
            "state": "PA",
            "zip": "17067",
            "country": "US",
            "phone": "71793351151041",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": false,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [],
            "_internal": {
              "id": 9564199276,
              "public_id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "return_address_id": 9564199276,
          "buyer_address": {
            "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
            "object": "Address",
            "created_at": "2021-10-28T23:41:37+00:00",
            "updated_at": "2021-10-28T23:41:37+00:00",
            "name": null,
            "company": "MATTHEW ONEILL",
            "street1": "10929 SUNRISE DR NE",
            "street2": "NULL",
            "city": "BAINBRIDGE ISLAND",
            "state": "WA",
            "zip": "98110-3315",
            "country": "US",
            "phone": "6179539993",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": true,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [
              {
                "id": null,
                "address_id": null,
                "name": "delivery",
                "success": true,
                "results": null,
                "created_at": null,
                "updated_at": null,
                "details": {
                  "carrier_route": "R010",
                  "latitude": 47.66244,
                  "longitude": -122.5103,
                  "time_zone": "America/Los_Angeles"
                },
                "user_id": null
              }
            ],
            "_internal": {
              "id": 9564199312,
              "public_id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "buyer_address_id": 9564199312,
          "selected_rate": null,
          "rates": [
            {
              "id": "rate_38b8af5ae2c84feea0b4d828eaf542ca",
              "carrier_account_id": 351401,
              "carrier": "USPS",
              "service": "ParcelSelect",
              "selected": false,
              "rate_amount": "217.90"
            },
            {
              "id": "rate_bc93f7fae1614d8db1806fcd37a1efe7",
              "carrier_account_id": 1902700,
              "carrier": "UPS",
              "service": "3DaySelect",
              "selected": false,
              "rate_amount": "852.98"
            },
            {
              "id": "rate_599552fab41a4be1943b75af0ef10e3c",
              "carrier_account_id": 1902700,
              "carrier": "UPS",
              "service": "Ground",
              "selected": false,
              "rate_amount": "259.69"
            },
            {
              "id": "rate_8315a781391b4aa580c178e23a9d6651",
              "carrier_account_id": 1902700,
              "carrier": "UPS",
              "service": "NextDayAirSaver",
              "selected": false,
              "rate_amount": "1560.36"
            },
            {
              "id": "rate_d7c958f2be334bcd89376ce9c606522c",
              "carrier_account_id": 1902700,
              "carrier": "UPS",
              "service": "NextDayAir",
              "selected": false,
              "rate_amount": "1575.08"
            },
            {
              "id": "rate_189b9c4cc07a42ebaee4bb07ad2d5276",
              "carrier_account_id": 1902700,
              "carrier": "UPS",
              "service": "2ndDayAir",
              "selected": false,
              "rate_amount": "1223.06"
            }
          ],
          "postage_label": null,
          "postage_label_id": null,
          "carrier_account_id": null,
          "parcel": {
            "id": "prcl_194662e5f58b4d3bab3392ac400fd670",
            "object": "Parcel",
            "created_at": "2021-10-29T02:34:42Z",
            "updated_at": "2021-10-29T02:34:42Z",
            "length": 54,
            "width": 30,
            "height": 7,
            "predefined_package": null,
            "weight": 1120,
            "mode": "production",
            "_internal": {
              "id": 3271211393,
              "public_id": "prcl_194662e5f58b4d3bab3392ac400fd670",
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              },
              "user_id": 345977
            }
          },
          "parcel_id": 3271211393,
          "insurance_id": null,
          "customs_info": null,
          "customs_info_id": null,
          "scan_form": null,
          "scan_form_id": null,
          "tracker": null,
          "tracker_id": null,
          "order_id": 307113010,
          "refund": null,
          "refund_id": null,
          "forms": [],
          "fees": []
        }
      },
      {
        "created_at": "2021-10-29T02:34:42Z",
        "is_return": false,
        "messages": [],
        "mode": "production",
        "options": {
          "currency": "USD",
          "payment": {
            "type": "SENDER"
          },
          "date_advance": 0
        },
        "reference": null,
        "status": "unknown",
        "tracking_code": null,
        "updated_at": "2021-10-29T02:34:42Z",
        "batch_id": null,
        "batch_status": null,
        "batch_message": null,
        "customs_info": null,
        "from_address": {
          "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
          "object": "Address",
          "created_at": "2021-10-28T23:41:36+00:00",
          "updated_at": "2021-10-28T23:41:36+00:00",
          "name": "James Mahoski",
          "company": "Kalon Studios",
          "street1": "650 Houtztown Rd.",
          "street2": "null",
          "city": "Myerstown",
          "state": "PA",
          "zip": "17067",
          "country": "US",
          "phone": "71793351151041",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": false,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {}
        },
        "insurance": null,
        "order_id": "order_bbbaf2b4a9a4476aa3d3cac44293b811",
        "parcel": {
          "id": "prcl_09927f5db73e4a6186d6d592fe91db12",
          "object": "Parcel",
          "created_at": "2021-10-29T02:34:42Z",
          "updated_at": "2021-10-29T02:34:42Z",
          "length": 54,
          "width": 30,
          "height": 7,
          "predefined_package": null,
          "weight": 1120,
          "mode": "production"
        },
        "postage_label": null,
        "rates": [
          {
            "object": "Rate",
            "created_at": "2021-10-29T02:34:44Z",
            "updated_at": "2021-10-29T02:34:44Z",
            "mode": "production",
            "service": "ParcelSelect",
            "carrier": "USPS",
            "rate": "215.00",
            "currency": "USD",
            "retail_rate": "215.00",
            "retail_currency": "USD",
            "list_rate": "215.00",
            "list_currency": "USD",
            "delivery_days": 7,
            "delivery_date": null,
            "delivery_date_guaranteed": false,
            "est_delivery_days": 7,
            "shipment_id": "shp_c8d02a595e694bdd9c5e33fccea49328",
            "carrier_account_id": "ca_5efdd4eefaf348d8a23ba9004f31b31c",
            "id": "rate_b18a7a4497e64f4396638c0cc59f3148"
          }
        ],
        "refund_status": null,
        "scan_form": null,
        "selected_rate": null,
        "tracker": null,
        "to_address": {
          "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
          "object": "Address",
          "created_at": "2021-10-28T23:41:37+00:00",
          "updated_at": "2021-10-28T23:41:37+00:00",
          "name": null,
          "company": "MATTHEW ONEILL",
          "street1": "10929 SUNRISE DR NE",
          "street2": "NULL",
          "city": "BAINBRIDGE ISLAND",
          "state": "WA",
          "zip": "98110-3315",
          "country": "US",
          "phone": "6179539993",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": true,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {
            "delivery": {
              "success": true,
              "errors": [],
              "details": {
                "latitude": 47.66244,
                "longitude": -122.5103,
                "time_zone": "America/Los_Angeles"
              }
            }
          }
        },
        "usps_zone": 8,
        "return_address": {
          "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
          "object": "Address",
          "created_at": "2021-10-28T23:41:36+00:00",
          "updated_at": "2021-10-28T23:41:36+00:00",
          "name": "James Mahoski",
          "company": "Kalon Studios",
          "street1": "650 Houtztown Rd.",
          "street2": "null",
          "city": "Myerstown",
          "state": "PA",
          "zip": "17067",
          "country": "US",
          "phone": "71793351151041",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": false,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {}
        },
        "buyer_address": {
          "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
          "object": "Address",
          "created_at": "2021-10-28T23:41:37+00:00",
          "updated_at": "2021-10-28T23:41:37+00:00",
          "name": null,
          "company": "MATTHEW ONEILL",
          "street1": "10929 SUNRISE DR NE",
          "street2": "NULL",
          "city": "BAINBRIDGE ISLAND",
          "state": "WA",
          "zip": "98110-3315",
          "country": "US",
          "phone": "6179539993",
          "email": null,
          "mode": "production",
          "carrier_facility": null,
          "residential": true,
          "federal_tax_id": null,
          "state_tax_id": null,
          "verifications": {
            "delivery": {
              "success": true,
              "errors": [],
              "details": {
                "latitude": 47.66244,
                "longitude": -122.5103,
                "time_zone": "America/Los_Angeles"
              }
            }
          }
        },
        "forms": [],
        "fees": [],
        "id": "shp_c8d02a595e694bdd9c5e33fccea49328",
        "object": "Shipment",
        "_internal": {
          "id": 3273774082,
          "public_id": "shp_c8d02a595e694bdd9c5e33fccea49328",
          "insurance_value_usd": null,
          "user": {
            "id": 345977,
            "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
            "object": "User",
            "parent_id": null,
            "billing_user_id": 345977,
            "name": "Michaele Pauwen",
            "email": "michaele@kalonstudios.com",
            "phone_number": "3233176826",
            "balance": "$107.29540",
            "price_per_shipment": "0.00000",
            "disabled": false,
            "disabled_at": null,
            "created_at": "2019-01-14T22:49:42Z",
            "updated_at": "2019-03-15T19:18:36Z",
            "watch": false,
            "source": null,
            "stripe_customer": {
              "id": 14642
            },
            "user_flag": {
              "id": 94029
            }
          },
          "user_id": 345977,
          "batch_id": null,
          "to_address": {
            "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
            "object": "Address",
            "created_at": "2021-10-28T23:41:37+00:00",
            "updated_at": "2021-10-28T23:41:37+00:00",
            "name": null,
            "company": "MATTHEW ONEILL",
            "street1": "10929 SUNRISE DR NE",
            "street2": "NULL",
            "city": "BAINBRIDGE ISLAND",
            "state": "WA",
            "zip": "98110-3315",
            "country": "US",
            "phone": "6179539993",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": true,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [
              {
                "id": null,
                "address_id": null,
                "name": "delivery",
                "success": true,
                "results": null,
                "created_at": null,
                "updated_at": null,
                "details": {
                  "carrier_route": "R010",
                  "latitude": 47.66244,
                  "longitude": -122.5103,
                  "time_zone": "America/Los_Angeles"
                },
                "user_id": null
              }
            ],
            "_internal": {
              "id": 9564199312,
              "public_id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "to_address_id": 9564199312,
          "from_address": {
            "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
            "object": "Address",
            "created_at": "2021-10-28T23:41:36+00:00",
            "updated_at": "2021-10-28T23:41:36+00:00",
            "name": "James Mahoski",
            "company": "Kalon Studios",
            "street1": "650 Houtztown Rd.",
            "street2": "null",
            "city": "Myerstown",
            "state": "PA",
            "zip": "17067",
            "country": "US",
            "phone": "71793351151041",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": false,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [],
            "_internal": {
              "id": 9564199276,
              "public_id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "from_address_id": 9564199276,
          "return_address": {
            "id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
            "object": "Address",
            "created_at": "2021-10-28T23:41:36+00:00",
            "updated_at": "2021-10-28T23:41:36+00:00",
            "name": "James Mahoski",
            "company": "Kalon Studios",
            "street1": "650 Houtztown Rd.",
            "street2": "null",
            "city": "Myerstown",
            "state": "PA",
            "zip": "17067",
            "country": "US",
            "phone": "71793351151041",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": false,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [],
            "_internal": {
              "id": 9564199276,
              "public_id": "adr_48f41f57df80498ca3774cd7c3e2f64e",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "return_address_id": 9564199276,
          "buyer_address": {
            "id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
            "object": "Address",
            "created_at": "2021-10-28T23:41:37+00:00",
            "updated_at": "2021-10-28T23:41:37+00:00",
            "name": null,
            "company": "MATTHEW ONEILL",
            "street1": "10929 SUNRISE DR NE",
            "street2": "NULL",
            "city": "BAINBRIDGE ISLAND",
            "state": "WA",
            "zip": "98110-3315",
            "country": "US",
            "phone": "6179539993",
            "email": null,
            "mode": "production",
            "carrier_facility": null,
            "residential": true,
            "federal_tax_id": null,
            "state_tax_id": null,
            "verifications": [
              {
                "id": null,
                "address_id": null,
                "name": "delivery",
                "success": true,
                "results": null,
                "created_at": null,
                "updated_at": null,
                "details": {
                  "carrier_route": "R010",
                  "latitude": 47.66244,
                  "longitude": -122.5103,
                  "time_zone": "America/Los_Angeles"
                },
                "user_id": null
              }
            ],
            "_internal": {
              "id": 9564199312,
              "public_id": "adr_57d2b4b31bbc4e02ac220efb41770aa4",
              "user_id": 345977,
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              }
            }
          },
          "buyer_address_id": 9564199312,
          "selected_rate": null,
          "rates": [
            {
              "id": "rate_b18a7a4497e64f4396638c0cc59f3148",
              "carrier_account_id": 351401,
              "carrier": "USPS",
              "service": "ParcelSelect",
              "selected": false,
              "rate_amount": "215.00"
            }
          ],
          "postage_label": null,
          "postage_label_id": null,
          "carrier_account_id": null,
          "parcel": {
            "id": "prcl_09927f5db73e4a6186d6d592fe91db12",
            "object": "Parcel",
            "created_at": "2021-10-29T02:34:42Z",
            "updated_at": "2021-10-29T02:34:42Z",
            "length": 54,
            "width": 30,
            "height": 7,
            "predefined_package": null,
            "weight": 1120,
            "mode": "production",
            "_internal": {
              "id": 3271211397,
              "public_id": "prcl_09927f5db73e4a6186d6d592fe91db12",
              "user": {
                "id": 345977,
                "public_id": "user_e54a24dc5a8b4d47bbc2a5ee2e4df07c",
                "object": "User",
                "parent_id": null,
                "billing_user_id": 345977,
                "name": "Michaele Pauwen",
                "email": "michaele@kalonstudios.com",
                "phone_number": "3233176826",
                "balance": "$107.29540",
                "price_per_shipment": "0.00000",
                "disabled": false,
                "disabled_at": null,
                "created_at": "2019-01-14T22:49:42Z",
                "updated_at": "2019-03-15T19:18:36Z",
                "watch": false,
                "source": null,
                "stripe_customer": {
                  "id": 14642
                },
                "user_flag": {
                  "id": 94029
                }
              },
              "user_id": 345977
            }
          },
          "parcel_id": 3271211397,
          "insurance_id": null,
          "customs_info": null,
          "customs_info_id": null,
          "scan_form": null,
          "scan_form_id": null,
          "tracker": null,
          "tracker_id": null,
          "order_id": 307113010,
          "refund": null,
          "refund_id": null,
          "forms": [],
          "fees": []
        }
      }
    ]
  }


  //===============================================================//
);


// Delete order address data
delete data.to_address.id
delete data.to_address.mode
delete data.to_address.verifications
delete data.to_address.updated_at
delete data.to_address.created_at
delete data.to_address.carrier_facility
delete data.from_address.id
delete data.from_address.mode
delete data.from_address.verifications
delete data.from_address.created_at
delete data.from_address.updated_at

// Delete all shipment id's, usps_zone's, tracker's, and parcel's
for (i = 0; i < data.shipments.length; i++) {
  delete data.shipments[i].id
  delete data.shipments[i].usps_zone
  delete data.shipments[i].tracker
  delete data.shipments[i].parcel.id
  delete data.shipments[i].parcel.created_at
  delete data.shipments[i].parcel.mode
  delete data.shipments[i].parcel.updated_at
  if (data.shipments[i].parcel.predefined_package === null) {
      delete data.shipments[i].parcel.predefined_package
  }

  // Delete all shipments customs data
  if (data.shipments[i].customs_info) {
      delete data.shipments[i].customs_info.id
      delete data.shipments[i].customs_info.mode
      delete data.shipments[i].customs_info.created_at
      delete data.shipments[i].customs_info.updated_at
      for (ii = 0; ii < data.shipments[i].customs_info.customs_items.length; ii++) {
          delete data.shipments[i].customs_info.customs_items[ii].id
          delete data.shipments[i].customs_info.customs_items[ii].mode
          delete data.shipments[i].customs_info.customs_items[ii].created_at
          delete data.shipments[i].customs_info.customs_items[ii].updated_at
          delete data.shipments[i].customs_info.customs_items[ii].currency
      }
  }
}

// Recreate the order
const order = new api.Order({
  to_address: data.to_address,
  from_address: data.from_address,
  shipments: data.shipments,
  options: data.options,
  customs_info: data.customs_info,
  // is_return: true,
  carrier_accounts: [{ id: process.env.fedex }],
});

// Print the results to console
console.log("//===============================================================//");
order.save().then(console.log).catch(console.log);