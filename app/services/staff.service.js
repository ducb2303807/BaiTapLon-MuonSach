const { ObjectId } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");

class StaffService {
  constructor(client) {
    this.Staff = client.db().collection("NhanVien");
  }

  extractStaffData(payload) {
    const staff = {
      MSNV: payload.MSNV,
      HoTenNV: payload.HoTenNV,
      Password: payload.Password,
      ChucVu: payload.ChucVu,
      DiaChi: payload.DiaChi,
      SoDienThoai: payload.SoDienThoai,
    };

    Object.keys(staff).forEach(
      (key) => staff[key] === undefined && delete staff[key]
    );
  }
}

module.exports = StaffService;
