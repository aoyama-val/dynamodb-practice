const AWS = require("aws-sdk");

async function main() {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-northeast-1" });
  const TABLE_NAME = "aoyama-test2";

  //let ret = await docClient.get({
  //  TableName: TABLE_NAME,
  //  Key: {
  //    "hk": "1",
  //  },
  //}).promise();
  //console.log("ret:", JSON.stringify(ret, null, 2));

  var params = {
    TableName: TABLE_NAME,
    Key: {
      hk: "3",
    },
    ExpressionAttributeNames: {
      "#null": "null",
      "#bool": "bool",
    },
    ExpressionAttributeValues: {
      ":null": null,
      ":bool": true,
    },
    UpdateExpression: "SET #null = :null, #bool = :bool",
  };

  try {
    let ret = await docClient.update(params).promise();
    console.log("ret:", JSON.stringify(ret, null, 2));
  } catch (err) {
    if (err.code == "ConditionalCheckFailedException") {
      console.log("ConditionExpressionの条件不成立により更新されませんでした。");
    } else {
      console.log("予期しないエラー:", err);
    }
  }
  //params = {
  //  TableName: TABLE_NAME,
  //  Key: {
  //    hk: "1",
  //  },
  //  ExpressionAttributeNames: {
  //    "#number": "number",
  //    "#stringSet": "stringSet",
  //  },
  //  ExpressionAttributeValues: {
  //    ":addNumber": 100,
  //    ":newString": docClient.createSet("chin"),
  //  },
  //  UpdateExpression: "ADD #number :addNumber, #stringSet :newString",
  //};
  //await docClient.update(params).promise();
}

main();
