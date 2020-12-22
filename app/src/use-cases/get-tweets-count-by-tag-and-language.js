const repositories = require('../repositories')

async function getTweetsCountByTagAndLanguage () {
  const tags = await repositories.tweets.countByTagAndLanguage()

  return { tags }
}

module.exports = getTweetsCountByTagAndLanguage
