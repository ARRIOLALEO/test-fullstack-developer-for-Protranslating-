const mongoose = require("mongoose");
const { config } = require("./index");

module.exports = {
  connection: null,
  connect: () => {
    if (this.connection) return this.connection;
    return mongoose
      .connect(config.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((connection) => {
        this.connection = connection;
        console.log("Conexion a DB exitosa");
      })
      .catch((err) => console.log(err));
  },
};
