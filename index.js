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

async function update(hk, sk, status) {
    const params = {
        TableName: TABLE_NAME,
        Key: { hk: hk, sk: sk },
        UpdateExpression: "set #status = :status",
        ExpressionAttributeNames: { "#status": "status" },
        ExpressionAttributeValues: { ":status": status },
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("update params:", JSON.stringify(params, null, 2));
    let ret = await docClient.update(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function addNum(hk, sk, delta) {
    const params = {
        TableName: TABLE_NAME,
        Key: { hk: hk, sk: sk },
        UpdateExpression: "add #num :delta",
        ExpressionAttributeNames: { "#num": "num" },
        ExpressionAttributeValues: { ":delta": delta },
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("update params:", JSON.stringify(params, null, 2));
    let ret = await docClient.update(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function get(hk, sk) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            hk: hk,
            sk: sk,
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

async function query(hk) {
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: "#hk = :hk",
        ExpressionAttributeNames:{ "#hk": "hk" },
        ExpressionAttributeValues: { ":hk": hk },
        Limit: 10,
        ScanIndexForward: false,    // true = 昇順, false = 降順
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("query params:", JSON.stringify(params, null, 2));
    let ret = await docClient.query(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function scan() {
    const params = {
        TableName: TABLE_NAME,
        ReturnConsumedCapacity: "TOTAL",
    };
    console.log("scan params:", JSON.stringify(params, null, 2));
    let ret = await docClient.scan(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
}

async function main() {
    //await put({ hk: "hoge", sk: "001", status: "created", num: 0 });
    //await get("hoge", "001");
    //await addNum("hoge", "001", 3);
    //await update("hoge", "001", "updated");
    //await deleteItem("hoge", "001");
    await query("hoge");
    //await scan();
}

main();
