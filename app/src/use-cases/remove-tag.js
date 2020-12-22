const repositories = require('../repositories')

async function removeTag (payload) {
  const exists = await repositories.tags.existsById({
    id: payload.id
  })

  if (!exists) {
    const error = new Error('Tag does not exist.')
    error.status = 404

    throw error
  }

  await repositories.tags.remove({
    id: payload.id
  })
}

module.exports = removeTag
