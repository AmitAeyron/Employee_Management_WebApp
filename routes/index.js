const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isLoggIn } = require("../middleWare/isLoggedIn");

const productModel = require("../models/employee-model");



router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/dashboard", isLoggIn, async function (req, res, next) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("dashboard", { products, success });
});



router.get("/employees", isLoggIn, async function (req, res) {
  try {
    let employees = await productModel.find();
    const totalCount = employees.length; 
    console.log("Employees Fetched:", employees); 
    
    res.render('employees', { employees, totalCount });
  } catch (error) {
    console.error(error);
    req.flash("error", "Unable to load employees.");
    res.redirect("/");
  }
});


router.get("/delete/:id", async function (req, res, next) {
  try {
    await productModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/employees");
  } catch (error) {
    console.error("Error deleting employee:", error);
    req.flash("error", "Unable to delete employee.");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  const employee = await productModel.findById({ _id: req.params.id });
  res.render("editEmployees", { employee });
});


const upload = require('../controllers/upload');


router.post("/update/:id", upload.single('image'), async function (req, res, next) {
  const { name, email, mobile, designation, gender, course } = req.body;

  try {
    // Find the employee document in the database
    let employee = await productModel.findById(req.params.id);

    // Update the employee fields with the new values from the form
    employee.name = name;
    employee.email = email;
    employee.mobile = mobile;
    employee.designation = designation;
    employee.gender = gender;
    employee.course = course;

    // Check if an image file was uploaded, if so, update the image field as a Base64 string
    if (req.file) {
      // Convert the image buffer to a Base64 string
      const base64Image = req.file.buffer.toString('base64');
      employee.image = base64Image; // Save the Base64 string in the image field
    }

    await employee.save();
    res.redirect("/employees");
  } catch (error) {
    console.error("Error updating employee:", error);
    req.flash("error", "Unable to update employee.");
    res.redirect("/employees");
  }
});

router.get("/logout", isLoggIn, function (req, res, next) {
  res.cookie("token", "");
});


module.exports = router;


