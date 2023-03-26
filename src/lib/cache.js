var cache = require('memory-cache');

const writeToCache = (url, data) =>
    cache.put(url, JSON.stringify(data), 86400);

const readFromCache = url => JSON.parse(cache.get(url)) || null

export { readFromCache, writeToCache }