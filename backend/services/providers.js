const Provider = require("../utils/schemas/providers");

class ProviderService {
  async getAll() {
    const allProviders = await Provider.find({});
    return allProviders || ["there are not providers to show"];
  }

  async getOne(id) {
    const oneProvider = await Provider.findById(id);
    return oneProvider || [`provider with id ${id} was not found`];
  }

  async create(data) {
    const provider = await Provider(data).save();
    return provider || ["there was an error saving the provider please try again"];
  }

  async update(id, data) {
    const updateProvider = await Provider.findByIdAndUpdate(id, data, {
      useFindAndModify: false,
    });
    return updateProvider || [`provider with id ${id} was not updated`];
  }

  async delete(id) {
    const deleteProvider = await Provider.findByIdAndDelete(id);
    return deleteProvider || "the provider was not deleted check if the id exist";
  }
}
module.exports = ProviderService;
