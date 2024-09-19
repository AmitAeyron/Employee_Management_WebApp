const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const registerUser = async function (req, res) {
  try {
    let { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error","You already have an accound. please login");
      return res.redirect("/");
    
    }

    bcrypt.genSalt(10, async function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return err.status(500).send(err.message);
        }

        let user = await userModel.create({
          email,
          password: hash,
          fullname,
        });

        let token = generateToken(user);
        res.cookie("token", token);
        req.flash("error","User Created Successfully. Now you can login");
        res.redirect("/");
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};

const loginUser = async function (req, res) {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {

  req.flash("error","This email is not registered. Create Your Acoount First.");
  return res.redirect("/"); 
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
     
      console.log("Successfull login");
      
      return res.redirect("/dashboard");
      
    } else {
      req.flash("error","password is not matching");
      res.redirect("/");
     
    }
  });
};

const logout=async function(req,res){
  res.cookie("token","");
  res.redirect("/");
}

module.exports = { registerUser, loginUser,logout };
