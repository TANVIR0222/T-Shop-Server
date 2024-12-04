import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:{
        type: Array,
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type: String,
        // required: true,
        default: 'Order Placed'
    },
    paymentMethod:{
        type: String,
        required: true
    },
    payment:{
        type:Boolean ,
        required: true,
        default: false
    }
},{timestamps: true})
const OrderModel = mongoose.model('Model', orderSchema);
export default OrderModel;  //export the model to use in other files