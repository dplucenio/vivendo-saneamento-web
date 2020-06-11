const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

function newsletterForm(data, callback) {
  console.log('on newsletterForm hook');
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

module.exports = {newsletterForm};