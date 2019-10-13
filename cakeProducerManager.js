"use strict";

const AWS = require("aws-sdk");
const ses = new AWS.SES({
    region: process.env.region
});

const CAKE_PRODUCER_EMAIL = process.env.cakeProducerEmail;
const ORDERING_SYSTEM_EMAIL = process.env.orderingSystemEmail;

module.exports.handlePlacedOrders = ordersPlaced => {
    let ordersPlacedPromises = [];

    for (let order of ordersPlaced) {
        ordersPlacedPromises.push(notifyCakeProducerByEmail(order));
    }

    return Promise.all(ordersPlacedPromises);
};

function notifyCakeProducerByEmail(order) {
    const params = {
        Destination: {
            ToAddresses: [CAKE_PRODUCER_EMAIL]
        },
        Message: {
            Body: {
                Text: {
                    Data: JSON.stringify(order)
                }
            },
            Subject: {
                Data: "new cake order"
            }
        },
        Source: ORDERING_SYSTEM_EMAIL
    };
    return ses
        .sendEmail(params)
        .promise()
        .then(data => {
            return data;
        });
}
