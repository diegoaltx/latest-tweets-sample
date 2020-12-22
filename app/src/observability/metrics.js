const client = require('prom-client')

const register = client.register

client.collectDefaultMetrics()

const cronRuns = new client.Counter({
  name: 'cron_runs_count',
  help: 'Total cron runs.',
  labelNames: [ 'status' ]
})

const tags = new client.Gauge({
  name: 'tags_total',
  help: 'Total of tags.'
})

const tweets = new client.Counter({
  name: 'tweets_total',
  help: 'Total of new tweets collected.'
})

module.exports = {
  client,
  register,
  cronRuns,
  tags,
  tweets
}
