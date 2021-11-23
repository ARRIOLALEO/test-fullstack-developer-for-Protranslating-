const express = require("express");
const ClientService = require("../services/clients");

const cors = require("cors");
function clientsAPI(app) {
  const router = express.Router();
  const clientService = new ClientService();

  /**
   * @swagger
   *  tags:
   *     name: Clients
   *     description: Clients CRUD API
   *
   *
   */

  /**
   * @swagger
   *  /api/v1/clients:
   *      get:
   *          description:  fetch and list of all clients with their providers
   *          tags: [Clients]
   *          responses:
   *              200:
   *                  description: All the clients were fetched
   *                  content:
   *                      application/json:
   *                          schema:
   *                              type: array
   *                              items:
   *                                  $ref:'#/utils/schemas/Client'
   */
  // Retrieve all Clients

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
   *@swagger
   * /api/v1/clients/{id}:
   *   get:
   *    description: fetch a client by its Id
   *    tags : [fetch client by id]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type:string
   *        required: true
   *        description : the id of the customer
   *    responses:
   *      200:
   *        description: Client fetched with index
   *        content:
   *          application/json:
   *            schema:
   *              $ref : "#/utils/schema/clients"
   *      404:
   *        description : client was not found
   *      500:
   *        description: server error
   *
   */
  // Retrieve a single Client with id
  router.get("/:clientId", async (req, res, next) => {
    const { clientId } = req.params;
    console.log(clientId);
    try {
      const client = await clientService.getClient(clientId);
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
   * /clients:
   *    put:
   *      description: Use to return all customers
   *    parameters:
   *      - name: customer
   *        in: query
   *        description: Name of our customer
   *        required: false
   *        schema:
   *          type: string
   *          format: string
   *    responses:
   *      '201':
   *        description: Successfully created user
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

  router.delete("/:clientId", async (req, res, next) => {
    const { clientId } = req;
    try {
      const deletedClient = clientService.deleteClient(clientId);
      res.status(200).json({
        data: `client with the id ${clientId} was removed from the database`,
        message: "resister deleted",
      });
    } catch (err) {
      next(err);
    }
  });
  app.use("/api/v1/clients", router);
}

module.exports = clientsAPI;
