const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Provider = mongoose.model("Provider", ProviderSchema);

module.exports = Provider;
