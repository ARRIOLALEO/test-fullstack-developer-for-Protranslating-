const express = require("express");
const ClientService = require("../services/clients");

const cors = require("cors");

function clientsAPI(app) {
  /**
   * @swagger
   * components:
   *    schemas:
   *      Client:
   *        type: object
   *        required:
   *          - name
   *          - email
   *          - phone
   *        properties:
   *          _id:
   *            type: string
   *          name:
   *            type: string
   *          email:
   *            type: string
   *          phone:
   *            type: number
   *          providers:
   *            type: array
   *        example:
   *          _id: 165161akshdkjas
   *          name: Mario Arriola
   *          email: marioarriolapacheco@gmail.com
   *          phone: +99654022666
   *          providers: [65546sadsa, sa6444ad]
   *
   */
  const router = express.Router();
  const clientService = new ClientService();
  /**
   *@swagger
   *  tags:
   *    name: Client
   *    description: CRUD clients
   */

  /**
   * @swagger
   * /api/v1/clients:
   *  get:
   *    summary: fetch all the clients in the DB
   *    tags: [Client]
   *    responses:
   *      200:
   *        description: clients were feched
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/Client'
   */
  router.get("/", async (req, res, next) => {
    try {
      const clients = await clientService.getClients();
      res.status(200).json({
        data: clients,
        message: "all products",
      });
    } catch (err) {
      next(err);
    }
  });
  /**
   * @swagger
   * /api/v1/clients/{id}:
   *  get:
   *    summary: fetch one client by index
   *    tags: [Client]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: the client id
   *    responses:
   *      200:
   *        summary: customer was fetch by id
   *        contents:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Client'
   */

  router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const client = await clientService.getClient(id);
      res.status(200).json({
        data: client,
        message: "customer with Id",
      });
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/clients:
   *  post:
   *    summary: create a new client
   *    tags: [Client]
   *    requestBody:
   *      require: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schema/Client'
   *    responses:
   *      200:
   *        description: client was create
   *        content:
   *          application/json:
   *            $ref: '#/components/schema/Client'
   *      500:
   *        description: Server Error
   */

  router.post("/", async (req, res, next) => {
    const { body: data } = req;

    try {
      const createClient = await clientService.createClient(data);
      res.status(201).json({
        data: createClient,
        message: "Client added",
      });
    } catch (err) {
      next(err);
    }
  });
  /**
   * @swagger
   *  /api/v1/clients/{id}:
   *    patch:
   *      summary: modify client with ID
   *      tags: [Client]
   *      parameters:
   *        - in: path
   *          name: id
   *          schema:
   *            type: string
   *          required: true
   *          description: client in
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Client'
   *      responses:
   *        200:
   *          description: client was modify succefully
   *          content:
   *            application/json:
   *              $ref: '#/components/schemas/Client'
   *        500:
   *          description: Server Error
   */
  router.patch("/:clientId", async (req, res, next) => {
    const { body: data } = req;
    const { clientId } = req.params;

    try {
      const updateClient = await clientService.updateClient(clientId, data);

      res.status(200).json({
        data: updateClient,
        message: "client update",
      });
    } catch (err) {
      next(err);
    }
  });
  /**
   * @swagger
   * /api/v1/clients/{id}:
   *  delete:
   *    summary: delete a customer by id
   *    tags: [Client]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: this is the customer id
   *    responses:
   *      200:
   *        description: client was deleted
   *      500:
   *        description: Server Error
   *
   *
   *
   */
  router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedClient = clientService.deleteClient(id);
      res.status(200).json({
        data: `client with the id ${id} was removed from the database`,
        message: "resister deleted",
      });
    } catch (err) {
      next(err);
    }
  });
  app.use("/api/v1/clients", router);
}
module.exports = clientsAPI;
