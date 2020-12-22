const { id } = require('monk')
const mongodb = require('../mongodb')

async function insert ({ value }) {
  await mongodb.main.get('tags').insert({ value })
}

async function countAll () {
  return await mongodb.main.get('tags').count()
}

async function exists ({ value }) {
  const found = await mongodb.main.get('tags').findOne({ value })

  if (found) {
    return true
  }

  return false
}

async function existsById ({ id }) {
  const found = await mongodb.main.get('tags').findOne({ _id: id })

  if (found) {
    return true
  }

  return false
}

async function remove ({ id }) {
  await mongodb.main.get('tags').remove({ _id: id }, { multi: false })
}

async function findAll () {
  const data = await mongodb.main.get('tags').find({})
  const tags = data.map(({ _id: id, value }) => ({ id, value }))

  return tags
}

module.exports = {
  insert,
  exists,
  existsById,
  remove,
  findAll,
  countAll
}
