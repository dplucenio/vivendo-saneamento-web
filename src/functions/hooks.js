const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

function newsletterForm(data, callback) {
  console.log('on newsletterForm hook');
  axios.post(`${process.env.GATSBY_BACKEND_BASEURL}/subscribers`, data)
    .then(res => {
      callback(null, JSON.stringify(res));
    }
    )
    .catch(err => {
      callback(err, JSON.stringify(err));
    });
}

function messageForm(data, callback) {
  console.log('on messageForm hook');
  axios.post(`${process.env.GATSBY_BACKEND_BASEURL}/messages`, data)
    .then(res => {
      callback(null, JSON.stringify(res));
    }
    )
    .catch(err => {
      callback(err, JSON.stringify(err));
    });
}

module.exports = {newsletterForm};