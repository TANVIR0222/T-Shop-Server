import OrderModel from "../Model/order.model.js";

export const placeOrder = async(req,res) => {
  try {
    const {userId, items , address , totalAmount } =  req.body;    
    const orderData = {
        userId,
        items,
        address,
        totalAmount,
        paymentMethod: 'usd',
        payment: false ,
    }

    const newOrder = await OrderModel(orderData);
    await newOrder.save();
    res.status(201).json({ message: "order successfully" , success: true , error:false , newOrder});

  } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false });

  }
};
export const placeOrderStripe = () => {};

export const allOrders = () => {};
export const updateStatus = () => {};
