function test(event, context, callback) {
  let response = {statusCode: 200, body: "hello functions"};
  callback(null, response);
}

module.exports = {
  handler: test
}