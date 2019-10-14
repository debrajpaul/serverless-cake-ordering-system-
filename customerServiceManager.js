"use strict";

const AWS = require("aws-sdk");
const sqs = new AWS.SQS({
    region: process.env.region
});

const CUSTOMER_COMPANY_QUEUE = process.env.customerServiceQueue;

module.exports.notifyCustomerServiceForReview = (orderId, orderReview) => {
    const review = {
        orderId: orderId,
        orderReview: orderReview,
        date: Date.now()
    };

    const params = {
        MessageBody: JSON.stringify(review),
        QueueUrl: CUSTOMER_COMPANY_QUEUE
    };
    return sqs.sendMessage(params).promise();
};
