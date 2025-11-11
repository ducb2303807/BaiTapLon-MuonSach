const config = {
  app: {
    port: process.env.APP_PORT || 3000,
  },
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/QuanLyMuonSach",
  },
};
module.exports = config;
