const hooks = require('./hooks');

function submissionCreated(event, context, callback) {
  const payload = JSON.parse(event.body).payload;
  const hook = hooks[payload.form_name];
  return hook(payload.data, callback);
}

module.exports = {
  handler: submissionCreated
}