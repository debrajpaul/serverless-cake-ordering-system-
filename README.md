# serverless-cake-ordering-system-

Data-driven applications have their application flow governed by the data, and the serverless framework can serve as the web framework to create this kind of application. In this course, join instructor Marcia Villalba as she takes you through an overview of serverless applications and Kinesis. Learn how to design an event-driven application, how to integrate AWS Lambda and Kinesis streams, and how to set up necessary permissions. Also, discover how to leverage CloudFormation, API Gateway, SES, SNS, and SQS, and more.

## Use Cases

-   Wrapping an existing internal or external endpoint/service

## Invoke the function locally

```bash
serverless invoke local --function createOrder
```

Which should result in:

```bash
Serverless: Your function ran successfully.

{
    "orderId": "dd2fa180-ee88-11e9-bf06-af6ce8bc5b1b",
    "name": "manoj",
    "address": "google",
    "productId": "delta1",
    "quantity": "12",
    "orderDate": 1571060720536,
    "eventType": "order_placed"
}
```

## Deploy

In order to deploy the endpoint, simply run:

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service serverless-cake-ordering-system.zip file to S3 (7.6 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...................................................................
Serverless: Stack update finished...
Service Information
service: serverless-cake-ordering-system
stage: dev
region: us-east-1
stack: serverless-cake-ordering-system-dev
resources: 38
api keys:
  None
endpoints:
  POST - https://v8e9rmifea.execute-api.us-east-1.amazonaws.com/dev/order
  POST - https://v8e9rmifea.execute-api.us-east-1.amazonaws.com/dev/order/fulfill
  POST - https://v8e9rmifea.execute-api.us-east-1.amazonaws.com/dev/order/delivered
functions:
  createOrder: serverless-cake-ordering-system-dev-createOrder
  orderFulfillment: serverless-cake-ordering-system-dev-orderFulfillment
  notifyExternlParties: serverless-cake-ordering-system-dev-notifyExternlParties
  notifyDeliveryCompany: serverless-cake-ordering-system-dev-notifyDeliveryCompany
  orderDelivered: serverless-cake-ordering-system-dev-orderDelivered
  notifyCustomerService: serverless-cake-ordering-system-dev-notifyCustomerService
layers:
  None
Serverless: Removing old service artifacts from S3...
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
```

## Usage

You can now invoke the Lambda directly and even see the resulting log via

```bash
serverless invoke --function createOrder --log
```

or as send an HTTP request directly to the endpoint using a tool like curl

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/createOrder
```

## Reach for..

Who do I talk to?

    Debraj Paul
    contact info:- pauldebraj7@gmail.com
    LinkedIn:- https://www.linkedin.com/in/debraj-paul

License

    MIT License
