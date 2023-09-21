const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mousepad",
  database: "college",
});

module.exports = pool.promise();
