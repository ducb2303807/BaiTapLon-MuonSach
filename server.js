const app = require("./app");
const config = require("./app/config");
const mongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
    await mongoDB.connect(config.db.uri);
    console.log("Connected to the database!");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error("Cannot start the server!", error);
    process.exit();
  }
}

startServer();
