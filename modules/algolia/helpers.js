export function getHeaders (algoliaConfig) {
  return {
    'X-Algolia-API-Key': algoliaConfig.key,
    'X-Algolia-Application-Id': algoliaConfig.appId
  }
}

export function sendJSON (data, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}
