import API from "./httprequest";

class ServicesProvider {
  constructor() {
    this.collection = "providers";
  }
  async allProviders() {
    const providers = await API.get(this.collection);
    return providers || [];
  }
  async saveProvider(data) {
    const providers = await API.post(this.collection, data);
    return providers || [];
  }

  async updateProvider(id, data) {
    const provider = await API.patch(this.collection + "/" + id, data);
    return provider || [];
  }
  async deleteProvider(id) {
    const providers = await API.delete(this.collection + "/" + id);
    return providers || [];
  }
}

export default new ServicesProvider();
