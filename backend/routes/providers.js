const exppress = require("express");
const ProviderService = require("../services/providers");

const cors = require("cors");

const corsOptions = require("../utils/cors/cors");

function providersAPI(app) {
  const router = exppress.Router();
  const providerService = new ProviderService();

  /**
   * @swagger
   * components:
   *  schemas:
   *    Provider:
   *      type: object
   *      require:
   *        - name
   *      properties:
   *        _id:
   *          type: string
   *        name:
   *          type: string
   *      example:
   *        _id: 165161aninkjdfjb
   *        name: provider name
   *
   */
  /**
   * @swagger
   *  tags:
   *     name: Provider
   *     description : Providers CRUD
   *
   *
   */

  /**
   * @swagger
   *  /api/v1/providers:
   *    get:
   *      summary: fetch all the providers
   *      tags: [Provider]
   *      responses:
   *        200:
   *          description: all the providers were fetched
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Provider'
   */

  router.get("/", cors(corsOptions), async (req, res, next) => {
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
   *  /api/v1/providers/{id}:
   *    get:
   *      summary: fetch one provider by id
   *      tags: [Provider]
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: the client provider
   *      responses:
   *        200:
   *          summary: the provider was fetched by id
   *          contents:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Provider'
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
   *  /api/v1/providers:
   *    post:
   *      summary: create a new provider
   *      tags: [Provider]
   *      requestBody:
   *        require: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Provider'
   *      responses:
   *        200:
   *          description: provider was created
   *          content:
   *            application/json:
   *              $ref: '#/components/schemas/Provider'
   *        500:
   *          description: Server Error
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
   *  /api/v1/providers/{id}:
   *    patch:
   *      summary: modify provider by id
   *      tags: [Provider]
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: provider id
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Provider'
   *      responses:
   *        200:
   *          description: provider was modify succefully
   *          content:
   *            application/json:
   *              $ref: '#/components/schemas/Provider'
   *        500:
   *          description: Server Error
   */

  router.patch("/:id", async (req, res, next) => {
    const { body: data } = req;
    const { id } = req.params;
    try {
      const updateProvider = await providerService.update(id, data);
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
   *  /api/v1/providers/{id}:
   *    delete:
   *      summary: delete Provider by id
   *      tags: [Provider]
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: this is the provider id
   *      responses:
   *        200:
   *          description: provider was deleted
   *        500:
   *          description: server Error
   *
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
