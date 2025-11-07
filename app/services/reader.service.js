const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class ReaderService {
  constructor(client) {
    this.Reader = client.db().collection("DocGia");
  }

  extractDocGiaData(payload) {
    const reader = {
      MaDocGia: payload.MaDocGia,
      HoLot: payload.HoLot,
      Ten: payload.Ten,
      NgaySinh: payload.NgaySinh,
      Phai: payload.Phai,
      DiaChi: payload.DiaChi,
      SoDienThoai: payload.SoDienThoai,
    };
    Object.keys(reader).forEach(
      (key) => reader[key] === undefined && delete reader[key]
    );
  }
}
module.exports = ReaderService;
