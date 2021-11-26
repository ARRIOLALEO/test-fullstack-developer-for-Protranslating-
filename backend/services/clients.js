const Client = require("../utils/schemas/clients");

class ClientService {
  async getClients() {
    const allClients = await Client.find({}).populate("providers");
    return allClients || ["there was an error retriving all the Clients"];
  }

  async getClient(id) {
    const clientWithId = await Client.findById(id);
    return clientWithId || [`no client was found with the id ${id}`];
  }

  async createClient(data) {
    const client = await Client(data).save();
    return client || ["there was an error saving the new Client"];
  }

  async updateClient(id, data) {
    const updatedClient = await Client.findByIdAndUpdate(id, data, { useFindAndModify: false });
    return (
      updatedClient || [
        "client was not modify please check the id of the client and the data that was sended",
      ]
    );
  }

  async deleteClient(id) {
    const deletedClient = await Client.findByIdAndDelete(id);
    return deletedClient || [`client was not deleted check the id ${id}`];
  }
}
module.exports = ClientService;
