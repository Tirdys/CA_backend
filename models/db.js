const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/StudentDB";

mongoose.connect(url,{useNewUrlParser:true},(err) => {
    if(!err){
        console.log("MongoDB is connected")
    }
    else{
        console.log("error connection MongoDB")
    }
})


require('./student.model');