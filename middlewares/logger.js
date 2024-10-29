const { createLogger, transports, format } = require("winston");
require("winston-mongodb"); // Requiring winston-mongodb will expose transports.MongoDB

//create error logger to check error and  store error logs in MongoDB
const logger = createLogger({
  transports: [
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGODB_URL,
      collection: "errorLogs",
      format: format.combine(format.timestamp(), format.json()),
    }).on("error", (err) => {
      console.error("MongoDB connection error:", err);
    }),
  ],
});

module.exports = {
  logger,
};
