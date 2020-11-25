const AWS = require("aws-sdk");

const TABLE_NAME = "aoyama-test2";

const dynamodb = new AWS.DynamoDB({ region: "ap-northeast-1" });

async function main() {
    const params = {
        TableName: TABLE_NAME,
        BillingMode: "PAY_PER_REQUEST",
        AttributeDefinitions: [
            { AttributeName: "hk", AttributeType: "S" },
            { AttributeName: "sk", AttributeType: "S" },
        ],
        KeySchema: [
            { AttributeName: "hk", KeyType: "HASH" },
            { AttributeName: "sk", KeyType: "RANGE" }
        ],
        //GlobalSecondaryIndexes: [
            //{
            //    IndexName: "type-key2-index", /* required */
            //    KeySchema: [ /* required */
            //        { AttributeName: "type", /* required */ KeyType: "HASH", /* required */ },
            //        { AttributeName: "key2", /* required */ KeyType: "RANGE" /* required */ },
            //    ],
            //    Projection: { /* required */ ProjectionType: "ALL", },
            //},
        //],
    };

    let data = await dynamodb.createTable(params).promise();
    console.log(JSON.stringify(data, null, 2));
    console.log(`Created ${TABLE_NAME}`);
}

main();
