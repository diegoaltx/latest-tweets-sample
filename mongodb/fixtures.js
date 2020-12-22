db.getSiblingDB('latest_tweets_sample').getCollection('tags').insert([
  { value: '#openbanking' },
  { value: '#remediation' },
  { value: '#devops' },
  { value: '#sre' },
  { value: '#microservices' },
  { value: '#observability' },
  { value: '#oauth' },
  { value: '#metrics' },
  { value: '#logmonitoring' },
  { value: '#opentracing' }
])
