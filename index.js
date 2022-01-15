const config = require("./config");
const app = require("./src/app");
const database = require("./src/database");
const { port } = config;

database.init();
app.listen(port, () => {
  console.log(`app started on port ${port}`);
});
