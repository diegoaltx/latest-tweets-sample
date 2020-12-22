const mongodb = require('../mongodb')

async function upsertMany (users) {
  const operations = users.map(user => ({
    replaceOne: {
      filter: { id: user.id },
      replacement: user,
      upsert: true      
    }
  }))

  await mongodb.main.get('users').bulkWrite(operations)
}

async function rankByFollowers ({ limit }) {
  const users = await mongodb.main.get('users').find({}, {
    sort: { followers: -1 },
    limit
  })

  return users
}

module.exports = {
  upsertMany,
  rankByFollowers
}
