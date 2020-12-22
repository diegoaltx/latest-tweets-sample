const mongodb = require('../mongodb')

async function upsertMany (tweets) {
  const operations = tweets.map(tweet => ({
    replaceOne: {
      filter: { id: tweet.id },
      replacement: tweet,
      upsert: true      
    }
  }))

  await mongodb.main.get('tweets').bulkWrite(operations)
}

async function countAll () {
  return await mongodb.main.get('tweets').count()
}

async function countByHour () {
  const hours = await mongodb.main.get('tweets').aggregate([
    { 
      $group: { 
        _id: { 
          $hour: { date: '$createdAt' }
        }, 
        tweetsCount: { $sum: 1 }
      } 
    },
    { 
      $project: { _id: 0, tweetsCount: 1, hour: '$_id' }
    },
    { 
      $sort: { hour: 1 }
    }
  ])

  return hours
}

async function countByTagAndLanguage () {
  const tags = await mongodb.main.get('tweets').aggregate([
    { 
      $group: { 
        _id: { tag: '$tag', language: '$language' },
        tweetsCount: { $sum: 1 }
      }
    },
    { 
      $group: { 
        _id: { tag: '$_id.tag' }, 
        tweetsCount: { $sum: '$tweetsCount' }, 
        languages: { 
          $push: { language: '$_id.language', tweetsCount: '$tweetsCount' }
        } 
      }
    },
    {
      $project: { 
        _id: 0, 
        tweetsCount: 1, 
        tag: '$_id.tag', 
        languages: '$languages'
      }
    }
  ])

  return tags
}

module.exports = {
  upsertMany,
  countAll,
  countByHour,
  countByTagAndLanguage
}
