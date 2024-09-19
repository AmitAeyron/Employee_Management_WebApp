const express = require("express");
const router = express.Router();
const upload = require("../controllers/upload"); // Importing the updated multer configuration

const productModel = require("../models/employee-model");

// Route for creating a new employee
router.post("/create", upload.single("image"), async function (req, res) {
  try {
    // Destructure fields from the request body
    let { name, email, mobile, designation, gender, course, createdDate } = req.body;

    // Convert the image buffer to a Base64 string if an image is uploaded
    let imageBase64 = req.file ? req.file.buffer.toString('base64') : null;

    // Create a new employee record in the database
    let employee = await productModel.create({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: imageBase64, // Save the Base64 image string in the image field
      createdDate
    });

    // Redirect to the employees list page after successful creation
    res.redirect("/employees");
  } catch (error) {
    // Send an error message in case of failure
    res.send(error.message);
  }
});

module.exports = router;
