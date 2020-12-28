const cache = require("memory-cache");
let memoryCache = new cache.Cache();

let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = memoryCache.get(key);
    if (cacheContent) {
      res.send(JSON.parse(cacheContent));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memoryCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};
module.exports = cacheMiddleware;
