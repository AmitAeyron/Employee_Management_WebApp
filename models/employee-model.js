const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: String,
  email:String,
  mobile:String,
  designation:String,
  gender:String,
  course: {
    type: [String],  // This allows the `course` field to accept an array of strings.
  },
  image: String,
  createdDate:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("employee", employeeSchema);
