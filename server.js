const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.DATABASE_LOCAL, {})
  .then(() => console.log("Database connection is successful"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
