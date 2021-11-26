const exppress = require("express");
const ProviderService = require("../services/providers");

function providersAPI(app) {
  const router = exppress.Router();
  const providerService = new ProviderService();
  /**
   * @swagger
   *  tags:
   *     name: Provider
   *     description : Providers CRUD
   *
   *
   */

  /**
   *  @swagger
   *  /api/v1/providers:
   *      get:
   *          description : fetch and list all providers
   *          tags: [Provider]
   */

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

  /**
   * @swagger
   * /api/vi/providers/{id}:
   *     get:
   *         description: Retrive one Provider
   *         tags: [Provider]
   */

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

  /**
   * @swagger
   * /api/v1/providers:
   *      put:
   *          description: create a new provider
   *          tags: [Provider]
   */

  router.post("/", async (req, res, next) => {
    const { body: data } = req;
    try {
      const newProvider = await providerService.create(data);
      res.status(201).json({
        data: newProvider,
        message: "created",
      });
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/providers/{id}:
   *     patch:
   *         description: update a provider
   *         tags: [Provider]
   */

  router.patch("/:idProvider", async (req, res, next) => {
    const { body: data } = req;
    const { idProvider } = req.params;
    try {
      const updateProvider = await providerService.update(idProvider, data);
      res.status(200).json({
        data: updateProvider,
        message: "updated",
      });
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/providers/{id}:
   *      delete:
   *          description: delete a provider
   *          tags: [Provider]
   */
  router.delete("/:idProvider", async (req, res, next) => {
    const { idProvider } = req.params;
    try {
      const providerDeleted = await providerService.delete(idProvider);
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
