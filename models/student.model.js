const mongoose = require('mongoose');
const { StringDecoder } = require('string_decoder');

const validator = require('email-validator');

var studentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    Schoolpaid:{
        type:String
    }
})

mongoose.model('Student',studentSchema);