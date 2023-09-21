const fs = require("fs");

// Asynchronous file read

// fs.readFile("one.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error("Error reading file");
//     return;
//   }
//   console.log("File content", data);
// });

const dataToWrite = "Hello, Node.js!";

// Asynchronous file write
fs.writeFile("one.txt", dataToWrite, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
    return;
  }
  console.log("File was written successfully.");
});
