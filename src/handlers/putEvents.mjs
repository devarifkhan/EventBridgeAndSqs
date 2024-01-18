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
export const handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`handler only accept POST method, you tried: ${event.httpMethod}`);
    }
    console.info('received:', event);

  

    const response = {
        statusCode: 200,
        body: JSON.stringify("Working....")
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
