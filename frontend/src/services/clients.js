import API from "./httprequest";
class ServiceClient {
  constructor() {
    this.collection = "clients";
  }
  async allClients() {
    const clients = await API.get(this.collection);
    return clients || [];
  }

  async saveClient(data) {
    const saved = await API.post(this.collection, data);
    return saved || [];
  }
  async deleteClient(id) {
    const client = await API.delete(this.collection + "/" + id);
    return client || [];
  }
  async updateClient(id, data) {
    const client = await API.patch(this.collection + "/" + id, data);
    return client || [];
  }
}

export default new ServiceClient();
