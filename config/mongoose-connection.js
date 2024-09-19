const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}/amit401`)
  .then(() => {
    dbgr("connection successfull");
  })
  .catch((err) => {
    dbgr("There is some error in database connectivity " + err);
  });

module.exports = mongoose;
