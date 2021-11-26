const express = require("express");
const Database = require("./config/databse");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { config } = require("./config/index");

const clientsAPI = require("./routes/clients");
const providersAPI = require("./routes/providers");
// extends infoObject swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: " Protranslating (now part of BigLS)",
      description: "Clients and Providers Api",
      contact: {
        name: "Mario Arriola",
        email: "marioarriolapacheco@gmail.com",
      },
      servers: [{ url: "http://localhost:8000" }],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//body parser
app.use(express.json());

//Routes
clientsAPI(app);
providersAPI(app);

Database.connect();
app.listen(config.port, (err) => {
  if (err) {
    console.log("there is an error on loading the server");
  }
  console.log(`listening on the port ${config.port}`);
});
