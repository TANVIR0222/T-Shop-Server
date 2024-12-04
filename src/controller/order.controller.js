import OrderModel from "../Model/order.model.js";
import UserModel from "../Model/user.model.js";

export const placeOrder = async(req,res) => {
  try {
    const {userId, item , address , totalAmount } = req.body;

    const orderData = {
        userId,
        item,
        address,
        totalAmount,
        paymentMethod: 'usd',
        payment: false ,
    }

    const newOrder = await OrderModel.create(orderData);
    await newOrder.save();

    // await UserModel.findByIdAndUpdate(userId , {carData : {} })

    res.status(201).json({ message: "order successfully" , success: true , error:false });

  } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false });

  }
};
export const placeOrderStripe = () => {};

export const allOrders = () => {};
export const updateStatus = () => {};
