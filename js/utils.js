const rssFeedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@highercomve';

export function encodeJSON (n, defaultObj = {}) {
  return encodeURIComponent(JSON.stringify(n || defaultObj))
}

export function decodeJSON (string, defaultValue = '{}') {
  return JSON.parse(decodeURIComponent(string) || defaultValue)
}

export function get (obj, path, fallback = '') {
  var [current, ...rest] = path.split('.')
  if (!obj[current]) {
    return fallback
  }
  return rest.length > 0 ? get(obj[current], rest.join('.'), fallback) : obj[current]
}

export function getGist (gist) {
  return fetch(`https://api.github.com/gists/${gist}`)
    .then(response => {
      if (response.status >= 300) {
        return fetch(`/assets/data.json`).then((r) => {
          return r.json()
        })
      }
      return response.json()
    })
    .then((json) => {
      return json
    })
    .catch((err) => {
      throw err
    })
}

export function getLatestArticles() {
  return fetch(rssFeedUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("can't fetch articles from medium")
      }
      return response.json();
    })
    .then(function(response) {
      return response.items.slice(0,4);
    })
    .catch(function(error) {
      console.error('Error fetching the feed:', error);
      throw error; // Re-throw the error to propagate it up the chain
    });
}