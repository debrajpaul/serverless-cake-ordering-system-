"use strict";

const orderManager = require("./orderManager");
const kinesisHelper = require("./kinesisHelper");
const cakeProducerManager = require("./cakeProducerManager");
const deliveryManager = require("./deliveryManager");

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

module.exports.notifyExternlParties = async event => {
    const records = kinesisHelper.getRecords(event);
    const cakeProducerPromise = getCakeProducerPromise(records);
    const deliveryPromise = getDeliveryPromise(records);

    return Promise.all([cakeProducerPromise, deliveryPromise])
        .then(() => {
            return "everything went well";
        })
        .catch(err => {
            return err;
        });
};

module.exports.notifyDeliveryCompany = async event => {
    // some http call
    console.log("delivery company endpoint");
    return "done";
};

module.exports.orderDelivered = async event => {
    const body = JSON.parse(event.body);
    const { orderId, deliveryCompanyId, orderReview } = body;
    return deliveryManager
        .orderDelivered(orderId, deliveryCompanyId, orderReview)
        .then(() => {
            return createResponse(
                200,
                `Order with orderId: ${orderId} was delivered successfully by companyId: ${deliveryCompanyId}`
            );
        })
        .catch(err => {
            return createResponse(400, err);
        });
};

module.exports.notifyCustomerService = async event => {
    // some http call
    console.log("coustomer service endpoint");
    return "done";
};

function createResponse(statusCode, message = {}) {
    return {
        statusCode,
        body: JSON.stringify(message, null, 2)
    };
}
function getCakeProducerPromise(records) {
    const ordersPlaced = records.filter(r => r.eventType === "order_placed");
    return ordersPlaced.length > 0
        ? cakeProducerManager.handlePlacedOrders(ordersPlaced)
        : null;
}

function getDeliveryPromise(records) {
    const orderFulfilled = records.filter(
        r => r.eventType === "order_fulfilled"
    );
    return orderFulfilled.length > 0
        ? deliveryManager.deliveryOrders(orderFulfilled)
        : null;
}
