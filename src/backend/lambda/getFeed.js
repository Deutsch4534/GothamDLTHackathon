
console.log('Loading function');
var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const data = await docClient.scan({
        TableName: "feed"
    }).promise();
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(data.Items),
    };
    return response;
 
};
