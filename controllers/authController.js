const mysql = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "hackk";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req);

    // Retrieve the user from the database
    const [rows] = await mysql.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const user = rows[0];

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    username = "vishwajeet";
    password = "hack";

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await mysql.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { login, register };
