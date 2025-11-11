const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");

class PublisherService {
  constructor(client) {
    this.Publisher = client.db().collection("NhaXuatBan");
  }
  // check khoa ngoai
  async keyCheck(payload) {
    const { MaNXB } = payload;
    if (!MaNXB) throw new ApiError(400, "MaNXB can't be empty");
    if (await this.Publisher.findOne({ MaNXB: MaNXB }))
      throw new ApiError(400, "MaNXB already exists");
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
    return publisher;
  }

  async create(payload) {
    const publisher = this.extractPublisherData(payload);
    const result = await this.Publisher.findOneAndUpdate(
      publisher,
      { $set: {} },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Publisher.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      TenNXB: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Publisher.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractPublisherData(payload);
    const result = await this.Publisher.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Publisher.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Publisher.deleteMany({});
    return result;
  }
}

module.exports = PublisherService;
