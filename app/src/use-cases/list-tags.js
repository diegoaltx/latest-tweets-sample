const repositories = require('../repositories')

async function listTags () {
  const tags = await repositories.tags.findAll()

  return { tags }
}

module.exports = listTags
