// // Create clients and set shared const values outside of the handler.

// // Create a DocumentClient that represents the query to add an item
// import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
// import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
// const client = new DynamoDBClient({});
// const ddbDocClient = DynamoDBDocumentClient.from(client);

// // Get the DynamoDB table name from environment variables
// const tableName = process.env.SAMPLE_TABLE;

// /**
//  * A simple example includes a HTTP get method to get all items from a DynamoDB table.
//  */



import {
    EventBridgeClient,
    PutEventsCommand
} from "@aws-sdk/client-eventbridge";
const EVENT_BUS_NAME = process.env.EVENT_BUS_NAME;
const client = new EventBridgeClient();


export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`handler only accept POST method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

    const input = { // PutEventsRequest
        Entries: [ // PutEventsRequestEntryList // required
            { // PutEventsRequestEntry
                Time: new Date("TIMESTAMP"),
                Source: "fuel_app",
                DetailType: "user_sign_up",
                Detail: JSON.stringify({
                    vehicleNo: "KA-01-123456",
                    NID: "0123456789"
                }),
                EventBusName: EVENT_BUS_NAME
            },
        ]
    };


    try {
        const command = new PutEventsCommand(input);
        const res = await client.send(command);
        const response = {
            statusCode: 200,
            body: JSON.stringify(res)
        }
        console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
        return response;
    } catch (err) {
        console.error(err);

        const errorResponse = {
            statusCode: 500,
            body: JSON.stringify({ error: err.message })
        };

        console.info(`error response from: ${event.path} statusCode: ${errorResponse.statusCode} body: ${errorResponse.body}`);
        return errorResponse;
    }
}