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