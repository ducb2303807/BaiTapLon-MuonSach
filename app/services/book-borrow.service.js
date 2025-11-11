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
      { $set: { TrangThai: "Đang mượn" } },
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
}

module.exports = BookBorrowService;
