const cron = require('node-cron')
const collectLatestTweets = require('./collect-latest-tweets')

function run () {
  cron.schedule('*/5 * * * *', collectLatestTweets)
}

module.exports = {
  run,
  collectLatestTweets
}
