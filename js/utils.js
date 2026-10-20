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

// Content is static: everything renders from the bundled assets/data.json.
// (The gist argument is kept for the callers; the live gist is no longer read.)
export function getGist (gist, onUpdate) {
  return fetch(`/assets/data.json`)
    .then((r) => r.json())
    .then(onUpdate)
    .catch(() => {})
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