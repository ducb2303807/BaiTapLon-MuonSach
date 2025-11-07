const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class PublisherService {
  constructor(client) {
    this.Publisher = client.db().collection("NhaXuatBan");
  }

  extractPublisherData(payload) {
    const publisher = {
      MaNXB: payload.MaNXB,
      TenNXB: payload.TenNXB,
      DiaChi: payload.DiaChi,
    };
    // remove undefined fields
    Object.keys(publisher).forEach(
      (key) => publisher[key] === undefined && delete publisher[key]
    );
  }
}

module.exports = PublisherService;
