export default function (context, inject) {
  const appId = 'HD8L8P9R0Q'
  const apiKey = 'c29bba919f0d7d322ff5b7ed630044ae'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId
  }
  inject('dataApi', { getHome, getReviewsByHomeId, getUserByHomeId })

  async function getHome (homeId) {
    try {
      return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getReviewsByHomeId (homeId) {
    try {
      return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: []
        })
      }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getUserByHomeId (homeId) {
    try {
      return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          attributesToHighlight: []
        })
      }))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function unWrap (response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText
    }
  }
}

function getErrorResponse (error) {
  return {
    ok: false,
    status: 500,
    statusText: error.message,
    json: {}
  }
}
