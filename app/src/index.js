const config = require('./config')
const api = require('./api')
const cron = require('./cron')
const observability = require('./observability')

const { port } = config.api

api.listen(port, () => {
  observability.logger.info(`Api started. Listening at port ${port}.`)
  cron.collectLatestTweets()
  cron.run()
})
