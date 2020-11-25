const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-northeast-1" });
const TABLE_NAME = "aoyama-test";

async function put(item) {
    const params = {
        TableName: TABLE_NAME,
        Item: item,
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("put params:", JSON.stringify(params, null, 2));
    let ret = await docClient.put(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function update() {
    const params = {
        TableName: TABLE_NAME,
        Key: { hk: "hoge", sk: "001" },
        UpdateExpression: "set #status = :status",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: { ":status": "updated" },
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("update params:", JSON.stringify(params, null, 2));
    let ret = await docClient.update(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function get() {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            hk: "hoge",
            sk: "001",
        },
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("get params:", JSON.stringify(params, null, 2));
    let ret = await docClient.get(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function deleteItem(hk, sk) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            hk: hk,
            sk: sk,
        },
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("delete params:", JSON.stringify(params, null, 2));
    let ret = await docClient.delete(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function main() {
    //await put();
    //await get();
    //await update();
    await deleteItem("hoge", "001");
}

main();
