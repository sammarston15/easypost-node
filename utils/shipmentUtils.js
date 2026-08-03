// log shipment without extraneous _params:
export const logShipment = (shipment) => {
  for (let key in shipment) {
    if (shipment[key] && typeof shipment[_params] === 'object') {
      delete shipment[key]._params
    }
  }

  console.log(shipment)
}

// log any rate errors:
export const logRateErrors = (shipment) => {
  if (shipment.messages) {
    // Remove the _params key from each object in shipment.messages
    const cleanedMessages = shipment.messages.map((message) => {
      const { _params, ...rest } = message;
      return rest;
    });
    console.log("  ");
    console.log("RATE ERRORS:");
    console.log(JSON.stringify(cleanedMessages, null, 2));
  }
};

// log any rates:
export const logShipmentRates = (shipment) => {
  if (shipment.rates.length >= 1) {
    console.log("   ");
    console.log("RATES:");
    for (const i in shipment.rates) {
      console.log(
        `${shipment.rates[i].carrier} - ${shipment.rates[i].service} - ${shipment.rates[i].rate}`
      );
    }
    console.log("   ");
  }
};

// link to shipment admin page
export const getAdminLink = (shipment) => {
  console.log("");
  console.log("=====SHIPMENT ID:=====");
  console.log(shipment.id);
  console.log("");
  console.log("=====ADMIN URL:=====");
  console.log(
    `https://easypost-admin.easypo.net/easy_post~shipment/${shipment.id}`
  );
};

// link to shipment label
export const getLabelUrl = (shipment) => {
  console.log(" ");
  console.log("=====LABEL URL:=====");
  console.log(JSON.stringify(shipment.postage_label.label_url));
};


// buy shipment
export const buyShipment = async (client, shipment) => {
  if (shipment?.rates?.length > 0 && shipment?.selected_rate === null) {
        try {
            console.log("   ")
            console.log("   ")
            console.log(`attempting to purchase ${shipment.id}...`)
            const boughtShipment = await client.Shipment.buy(
                shipment.id, // shipment id
                shipment.lowestRate(), // use this to buy the lowest rate
                // shipment.lowestRate( // use this to buy the lowest rate for a specific carrier and service
                //     ["DHLExpress"], // carrier
                //     ["EconomySelectNonDoc"] // service
                // ),
                null, // insurance
                null, // carbon offset
                // process.env.TEST_ENDSHIPPER_ID_EXAMPLE // end shipper
            )
            console.log("Shipment purchased: ",
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
                }, 10000) // wait 10 seconds before attempting refund
            }
        } catch (error) {
            console.log("   ")
            console.log("SHIPMENT BUY ERROR:")
            console.log(error)
        }
    } else {
        console.log(
            "\nNo purchase attempted because there were no rates available for this shipment or it was a one-call buy.\n",
        )
    }
}