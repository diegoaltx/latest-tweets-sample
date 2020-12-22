const express = require('express')
const useCases = require('../use-cases')
const schemas = require('./schemas')
const middlewares = require('./middlewares')
const cron = require('../cron')

const router = express.Router()

router.get('/users/top-by-followers', (req, res, next) => {
  useCases.getTopUsersByFollowers()
    .then(result => res.send(result))
    .catch(next)
})

router.get('/tweets/count-by-hour', (req, res, next) => {
  useCases.getTweetsCountByHour()
    .then(result => res.send(result))
    .catch(next)
})

router.get('/tweets/count-by-tag-and-language', (req, res, next) => {
  useCases.getTweetsCountByTagAndLanguage()
    .then(result => res.send(result))
    .catch(next)
})

router.get('/tags', (req, res, next) => {
  useCases.listTags()
    .then(result => res.send(result))
    .catch(next)
})

router.post(
  '/tags',
  middlewares.validateRequest(schemas.addTagRequest),
  (req, res, next) => {
    useCases.addTag(req.body)
      .then(_ => {
        res.status(201).send()
        cron.collectLatestTweets()
      })
      .catch(next)
  }
)

router.delete('/tags/:id', (req, res, next) => {
  useCases.removeTag({ id: req.params.id })
    .then(_ => res.status(200).send())
    .catch(next)
})

module.exports = router
