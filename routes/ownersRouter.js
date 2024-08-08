const express=require("express");
const router=express.Router();

router.get('/',function(req,res){
    console.log("hiii");
    
    res.send("heyiii");
});




module.exports=router;