import mongoose from "mongoose";

const preoductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:String,
        required:true
    },
    populer:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
},{timestamps: true});

const productModel = mongoose.model("Product", preoductSchema);
export default productModel;  //export the model