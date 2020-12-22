const cuid = require('cuid')
const useCases = require('../use-cases')
const observability = require('../observability')

function collectLatestTweets () {
  const logger = observability.logger.child({ cronId: cuid() })

  logger.debug('Started to collect latest tweets.')
  
  useCases.collectLatestTweets()
    .then(result => {
      logger.debug('Ended to collect latest tweets.', { result })
      observability.metrics.cronRuns.inc({ status: 'sucess' }, 1)
      observability.metrics.tags.set(result.tagsCount)
      observability.metrics.tweets.inc(result.tweetsCount)
    })
    .catch(err => {
      logger.error(err)
      observability.metrics.cronRuns.inc({ status: 'error' }, 1)
    })
}

module.exports = collectLatestTweets
