const Monk = require('monk')
const config = require('../config')

const db = Monk(config.mongodb.main.uri)

process.on('SIGINT', () => db.close())
process.on('SIGTERM', () => db.close())

module.exports = db
