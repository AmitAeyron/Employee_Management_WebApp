const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: String,
  email:String,
  mobile:String,
  designation:String,
  gender:String,
  course:String,
  image: String,
  createdDate:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("employee", employeeSchema);
