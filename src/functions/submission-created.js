const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const hooks = {
  newsletterForm(data, callback) {
    console.log('execute when newsletterForm');
    console.log(data);

    axios.post(`${process.env.GATSBY_BACKEND_BASEURL}/subscribers`, data)
      .then(res => {
        console.log(res);
        callback(null, res);
      }
      )
      .catch(err => {
        console.log(err);
        callback(null, err);
      });
  }
}


function submissionCreated(event, context, callback) {
  const payload = JSON.parse(event.body).payload;
  const hook = hooks[payload.form_name];
  return hook(payload.data, callback);
}

module.exports = {
  handler: submissionCreated
}