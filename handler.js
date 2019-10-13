"use strict";

const orderManager = require("./orderManager");
const kinesisHelper = require("./kinesisHelper");
const cakeProducerManager = require("./cakeProducerManager");

function createResponse(statusCode, message = {}) {
    return {
        statusCode,
        body: JSON.stringify(message, null, 2)
    };
}

module.exports.createOrder = async event => {
    const body = JSON.parse(event.body);
    const order = orderManager.createOrder(body);

    return orderManager
        .placeNewOrder(order)
        .then(() => {
            return createResponse(200, order);
        })
        .catch(err => {
            return createResponse(400, err);
        });
};

module.exports.orderFulfillment = async event => {
    const body = JSON.parse(event.body);
    const orderId = body.orderId;
    const fulfillmentId = body.fulfillmentId;

    return orderManager
        .fulfillOrder(orderId, fulfillmentId)
        .then(() => {
            return createResponse(
                200,
                `Order with orderId:${orderId} was sent to delivery`
            );
        })
        .catch(err => {
            return createResponse(400, err);
        });
};

module.exports.notifyCakeProducer = async event => {
    const records = kinesisHelper.getRecords(event);
    const ordersPlaced = records.filter(r => r.eventType === "order_placed");
    if (ordersPlaced.length <= 0) return "there is nothing todo";

    cakeProducerManager
        .handlePlacedOrders(ordersPlaced)
        .then(() => {
            return "everything went well";
        })
        .catch(err => {
            return err;
        });
};
