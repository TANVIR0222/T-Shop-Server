import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image:{
        type: Array,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    name:{
        type: String ,
        required: true
    },
    size:{
        type: String ,
        required: true
    },
},{timestamps: true})
const cartModel = mongoose.model('Cart', cartSchema);
export default cartModel;  //export the model to use in other files