const Provider = require("../utils/schemas/providers");

class ProviderService {
  async getProviders() {
    const allProviders = await Provider.find({});
    return allProviders || ["there are not providers to show"];
  }
  async createProvider(data) {
    const provider = await Provider(data).save();
    return provider || ["there was an error saving the provider please try again"];
  }
}
module.exports = ProviderService;
