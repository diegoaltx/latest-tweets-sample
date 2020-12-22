const Twitter = require('twitter-lite')
const config = require('../config')

const client = new Twitter({
  bearer_token: config.twitter.client.bearerToken
})

module.exports = client
