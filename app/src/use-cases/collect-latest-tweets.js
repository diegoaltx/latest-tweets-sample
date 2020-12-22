const twitter = require('../twitter')
const repositories = require('../repositories')

async function collectLatestTweets () {
  const tags = await repositories.tags.findAll()

  const promises = tags.map(tag => _collectTweetsByTag(tag))
  
  const before = await repositories.tweets.countAll()
  
  if (tags.length) {
    await Promise.all(promises)
  }
  
  const after = await repositories.tweets.countAll()

  return { 
    tagsCount: tags.length, 
    tweetsCount: after - before
  }
}

async function _collectTweetsByTag (tag) {
  const tweets = await twitter.tweets.listRecentByTag(tag.value)
  const users = tweets.map(tweet => tweet.user)
  
  if (!tweets.length) {
    return
  }
  
  await Promise.all([
    repositories.tweets.upsertMany(tweets),
    repositories.users.upsertMany(users)
  ])
}

module.exports = collectLatestTweets
