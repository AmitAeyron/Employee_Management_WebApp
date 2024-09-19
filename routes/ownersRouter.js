const express=require("express");
const router=express.Router();
const ownerModel=require('../models/owner-model')

router.get('/',function(req,res){  
    res.send("heyiii");
});

if(process.env.NODE_ENV==='development'){
router.post("/create",async function(req,res,next){
    let owners=await ownerModel.find();
    if(owners.length>0){
        return res.status(504).send("you don't have permission to create a new owner");
    }

    let {fullname,email,password}=req.body;
    await ownerModel.create({
        fullname,
        email,
        password,

    })

    res.status(201).send(" created owner");
});
}

router.get("/admin",function(req,res,next){
  let error=  req.flash("success");
    res.render("createproducts",{error});
})

module.exports=router;