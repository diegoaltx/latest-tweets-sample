const repositories = require('../repositories')

async function getTopUsersByFollowers () {
  const users = await repositories.users.rankByFollowers({ limit: 5 })

  return { users }
}

module.exports = getTopUsersByFollowers
