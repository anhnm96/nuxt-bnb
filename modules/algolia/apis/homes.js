import fetch from 'node-fetch'
import { getHeaders } from '../helpers'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
  const headers = getHeaders(algoliaConfig)
  return {
    delete: async (homeId, payload) => {
      try {
        return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
          headers,
          method: 'DELETE'
        }))
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    create: async (homeId, payload) => {
      try {
        return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify(payload)
        }))
      } catch (error) {
        return getErrorResponse(error)
      }
    },
    getByUserId: async (userId) => {
      try {
        return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `userId:${userId}`,
            attributesToRetrieve: [
              'objectID',
              'title'
            ],
            attributesToHighlight: []
          })
        }))
      } catch (error) {
        return getErrorResponse(error)
      }
    }

  }
}
