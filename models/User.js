const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type:String,required:true,unique:true, maxlength:60,minlength:2},
    password:{type:String,required:true,maxlength:60,minlength:5},
    createdAt:{type:Date, default:Date.now}
})






module.exports = mongoose.model('user' , UserSchema)