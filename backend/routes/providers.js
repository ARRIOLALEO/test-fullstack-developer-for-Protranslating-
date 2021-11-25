const exppress = require("express");
const ProviderService = require("../services/providers");

function providersAPI(app) {
  const router = exppress.Router();
  const providerService = new ProviderService();

  router.get("/", async (req, res, next) => {
    try {
      const providers = await providerService.getAll();
      res.status(200).json({
        data: providers,
        message: "providers retrived",
      });
    } catch (err) {
      next(err);
    }
  });
  router.get("/:idProvider", async (req, res, next) => {
    const { idProvider } = req.params;
    try {
      const provider = await providerService.getOne(idProvider);
      res.status(200).json({
        data: provider,
        message: `${idProvider}  fetched`,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    const { body: data } = req;
    try {
      const newProvider = providerService.create(data);
      res.status(201).json({
        data: newProvider,
        message: "created",
      });
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:idProvider", async (req, res, next) => {
    const { body: data } = req;
    const { idProvider } = req.paramsa;
    try {
      const updateProviders = providerService.update(id, data);
      res.status(200).json({
        data: updateProvider,
        message: "updated",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:idProvider", async (req, res, next) => {
    const { idProvider } = req.params;
    try {
      const providerDeleted = await providerService.delete();
      res.status(200).json({
        data: providerDeleted,
        message: "deleted",
      });
    } catch (err) {
      next(err);
    }
  });
  app.use("/api/v1/providers", router);
}

module.exports = providersAPI;
