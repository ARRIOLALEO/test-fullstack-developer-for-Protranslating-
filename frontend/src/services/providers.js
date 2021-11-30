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
  async deleteProvider(id) {
    const providers = await API.delete(this.collection + "/" + id);
    return providers || [];
  }
}

export default new ServicesProvider();
