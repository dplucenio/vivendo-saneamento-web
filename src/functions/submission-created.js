const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const hooks = {
  newsletterForm(data, callback) {
    console.log('execute when newsletterForm');
    let response = { statusCode: 200, body: "hello functions" };
    callback(null, response);
  }
}


function submissionCreated(event, context, callback) {
  const payload = JSON.parse(event.body).payload;
  const hook = hooks[payload.formName];
  return hook(payload.data, callback);
}

module.exports = {
  handler: submissionCreated
}