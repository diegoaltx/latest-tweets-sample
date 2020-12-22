const client = require('./client')

async function listRecentByTag (tag, { count = 100 } = {}) {
  let response

  try {
    response = await client.get('search/tweets', {
      q: tag, 
      count
    })
  }
  catch (e) {
    let error = e
    if ('errors' in e) {
      error = new Error(e.errors[0].message)
      error.code = e.errors[0].code
    }
    throw error
  }

  return response.statuses.map(status => ({
    id: status.id_str,
    createdAt: new Date(status.created_at),
    text: status.text,
    language: status.lang,
    user: {
      id: status.user.id_str,
      name: status.user.name,
      username: status.user.screen_name,
      followers: status.user.followers_count
    },
    tag
  }))
    
}

module.exports = {
  listRecentByTag
}
