const express=require("express");
const app=express();

const cookieParser=require("cookie-parser");
const path=require("path");
const db=require('./db/db');
const userSModel=require("./models/user-model");
const productModel=require("./models/product-model");

const usersRouter=require('./routes/usersRouter');
const ownersRouter=require('./routes/ownersRouter');
const productsRouter=require('./routes/productsRouter');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser);
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use('/owners', ownersRouter);
app.use("/user", usersRouter);
app.use("/products", productsRouter);

app.get('/',function(req,res,next){
    res.send("hiii");
})

const post=3000;
app.listen(post,()=>{
    console.log("App is running on port "+post);

})
