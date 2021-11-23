const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
  },
  providers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Provider",
    },
  ],
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = Client;
