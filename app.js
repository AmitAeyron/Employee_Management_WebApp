const express=require("express");
const app=express();

const cookieParser=require("cookie-parser");
const path=require("path");




const expressSession=require("express-session");
const flash=require("connect-flash");
require("dotenv").config();


app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || 'default_secret_key',
    })
);


app.use(flash());

const db=require('./config/mongoose-connection');
const userSModel=require("./models/user-model");
const productModel=require("./models/employee-model");
const ownerModel=require("./models/owner-model");
const usersRouter=require('./routes/usersRouter');
const ownersRouter=require('./routes/ownersRouter');
const employeesRouter=require("./routes/employeesRouter");
const indexRouter=require("./routes/index");
const { registerUser } = require("./controllers/authController");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/",indexRouter);
app.use('/owners', ownersRouter);
app.use("/users", usersRouter);
app.use("/products", employeesRouter);


const port=4000;
app.listen(port,()=>{
    console.log("App is running on port "+port);

})
