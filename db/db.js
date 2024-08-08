const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://amitaeyron:amit@cluster0.zzope.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log("There is some error in database connectivity "+ err);
})

module.exports=mongoose;