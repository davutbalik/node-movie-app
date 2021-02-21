const mongoose = require("mongoose");

module.exports = ()=>{
    mongoose.connect("mongodb+srv://dbUser:dbUserPass@cluster0.gfnoh.mongodb.net/movieappdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      mongoose.connection.on("open",()=>{console.log("MongoDb:Connected.")});
      mongoose.connection.on("error",()=>{console.log("MongoDB: Connection Failed.")});

}