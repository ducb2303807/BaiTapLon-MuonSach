const { ObjectId } = require("mongodb");

class BookBorrowService {
  constructor(client) {
    this.BookBorrow = client.db().collection("TheoDoiMuonSach");
  }

  extractTBookBorrowData(payload) {
    const bookBorrow = {
      MaDocGia: payload.MaDocGia,
      MaSach: payload.MaSach,
      NgayMuon: payload.NgayMuon,
      NgayTra: payload.NgayTra,
      TrangThai: payload.TrangThai,
    };

    Object.keys(bookBorrow).forEach(
      (key) => bookBorrow[key] === undefined && delete bookBorrow[key]
    );
    return bookBorrow;
  }

  async create(payload) {
    const bookBorrow = this.extractTBookBorrowData(payload);
    const result = await this.BookBorrow.findOneAndUpdate(
      bookBorrow,
      { $set: { TrangThai: payload.TrangThai || "Đang mượn" } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.BookBorrow.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.BookBorrow.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractTBookBorrowData(payload);
    const result = await this.BookBorrow.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.BookBorrow.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.BookBorrow.deleteMany({});
    return result;
  }
}

module.exports = BookBorrowService;
