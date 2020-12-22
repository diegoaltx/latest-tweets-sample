const repositories = require('../repositories')

async function getTweetsCountByHour () {
  const hours = await repositories.tweets.countByHour()

  return { hours }
}

module.exports = getTweetsCountByHour
