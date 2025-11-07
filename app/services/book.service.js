const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class BookService {
  constructor(client) {
    this.Book = client.db().collection("Sach");
  }
  extractSachData(payload) {
    const book = {
      MaSach: payload.MaSach,
      TenSach: payload.TenSach,
      DonGia: payload.DonGia,
      SoQuyen: payload.SoQuyen,
      NamXuatBan: payload.NamXuatBan,
      MaNXB: payload.MaNXB,
      TacGia: payload.TacGia,
    };

    // remove undefined fields
    Object.keys(book).forEach(
      (key) => book[key] === undefined && delete book[key]
    );
  }
}

module.exports = BookService;
