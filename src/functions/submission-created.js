
const hooks = {
  newsletterForm() {
    console.log('execute when newsletterForm');
  }
}


function submissionCreated(event, context, callback) {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
  console.log(JSON.stringify(event.body));
  const formName = JSON.parse(event.body).payload.form_name;
  console.log(formName);
  const hook = hooks[formName];
  hook();
  let response = {statusCode: 200, body: "hello functions"};
  callback(null, response);
}

module.exports = {
  handler: submissionCreated
}