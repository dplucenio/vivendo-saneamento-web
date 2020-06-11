function submissionCreated(event, context, callback) {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
  console.log(event.body.form_name);
  let response = {statusCode: 200, body: "hello functions"};
  callback(null, response);
}

module.exports = {
  handler: submissionCreated
}