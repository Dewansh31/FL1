import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
        trim:true
     },
     
},{timestamps:true}
);

export default mongoose.model('tutorials',tutorialSchema);