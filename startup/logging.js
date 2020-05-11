require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
  // implicitly exits the process as well
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtexceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    // winston.error(ex.message, ex);
    // process.exit(1);
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  winston.add(winston.transports.MongoDB, {
    db: "mongodb://localhost/vidly",
    level: "info",
  });
};
