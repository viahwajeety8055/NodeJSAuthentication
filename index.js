const express = require("express");
const router = require("./routes/routes");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/api", router);

app.listen("5000", () => {
  console.log("Server is listening....");
});
