const exppress = require("express");
const ProviderService = require("../services/providers");

function providersAPI(app) {
  const router = exppress.Router();
  const providerService = new ProviderService();

  router.get("/", async (req, res, next) => {
    try {
      const providers = await providerService.getProviders();
      res.status(200).json({
        data: providers,
        message: "retriving all the providers",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    const { body: data } = req;
    try {
      const newProvider = providerService.createProvider(data);
      res.status(201).json({
        data: newProvider,
        message: "new provided created",
      });
    } catch (err) {
      next(err);
    }
  });
  app.use("/api/v1/providers", router);
}

module.exports = providersAPI;
