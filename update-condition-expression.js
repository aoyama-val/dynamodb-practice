const AWS = require("aws-sdk");

async function main() {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-northeast-1" });
  const TABLE_NAME = "aoyama-test2";

  var params = {
    TableName: TABLE_NAME,
    Key: {
      "hk": "4",
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeNames: { "#name": "name", "#name2": "name" },
    ExpressionAttributeValues: { ":name": "めそ", ":name2": "ほげら" },
    ConditionExpression: "#name2 = :name2",
  };

  try {
    await docClient.update(params).promise();
  } catch (err) {
    if (err.code == "ConditionalCheckFailedException") {
      console.log("ConditionExpressionにより更新されませんでした。");
    }
  }
}

main();
