const repositories = require('../repositories')

async function addTag (payload) {
  const tag = {
    value: payload.value
  }

  const count = await repositories.tags.countAll()

  if (count >= 10) {
    const error = new Error('Limit of 10 tags reached.')
    error.status = 409

    throw error
  }

  const exists = await repositories.tags.exists(tag)

  if (exists) {
    const error = new Error('Tag already exists.')
    error.status = 409

    throw error
  }

  await repositories.tags.insert(tag)
}

module.exports = addTag
