const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../public/log.json");

function myLogger(message) {
  try {
    const now = new Date();
    const logEntry = {
      time: now.toISOString(),
      message,
    };

    let logs = [];

    if (fs.existsSync(logFilePath)) {
      const fileContent = fs.readFileSync(logFilePath, "utf-8");
      logs = JSON.parse(fileContent);
    }

    logs.unshift(logEntry);

    if (logs.length > 50) logs = logs.slice(0, 50);

    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Logging Error:", error.message);
  }
}

module.exports = myLogger;
