const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class BookBorrowService {
  constructor(client) {
    this.BookBorrow = client.db().collection("TheoDoiMuonSach");
  }

  extractTheoDoiMuonSachData(payload) {
    const bookBorrow = {
      MaDocGia: payload.MaDocGia,
      MaSach: payload.MaSach,
      NgayMuon: payload.NgayMuon,
      NgayTra: payload.NgayTra,
    };

    Object.keys(bookBorrow).forEach(
      (key) => bookBorrow[key] === undefined && delete bookBorrow[key]
    );
  }
}

module.exports = BookBorrowService;
