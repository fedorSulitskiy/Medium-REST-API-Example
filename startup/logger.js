const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

module.exports = {
  logger,
  handler: () => {
    process.on("uncaughtException", (ex) => {
      console.log("WE GOT UNCAUGHT EXCEPTION");
      logger.error(ex.message, ex);
      process.exit(1);
    });

    process.on("unhandledRejection", (ex) => {
      console.log("WE GOT AN UNHANDLED REJECTION");
      logger.error(ex.message, ex);
      process.exit(1);
    });
  },
};
