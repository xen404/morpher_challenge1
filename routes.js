const cacheMiddleware = require("./cacheMiddleware");

var SDK =
  typeof window !== "undefined"
    ? window.COIN_API_SDK
    : require("./coinapi")["default"];

var sdk = new SDK("28601476-1CD6-42D0-8A55-E58E5B452DDB");

var t = new Date(Date.parse("2020-11-01T22:08:41+00:00"));

assetsArr = ["BTC", "ETH"];

module.exports = (app) => {
  app.get("/api/assets", cacheMiddleware(30), async (req, res) => {
    try {
      const allAssets = await sdk.metadata_list_assets({
        filter_asset_id: assetsArr,
      });

      res.send(allAssets);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.get(
    "/api/convert/:base/:quote",
    cacheMiddleware(30),
    async (req, res) => {
      const { base, quote } = req.params;

      try {
        const exchangeRate = await sdk.exchange_rates_get_specific_rate(
          quote,
          base,
          t
        );

        res.send(exchangeRate);
      } catch (err) {
        console.error(err.message);
      }
    }
  );
};
