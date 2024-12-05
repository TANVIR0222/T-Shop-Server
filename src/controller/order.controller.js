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

export const allOrders = async(req,res) => {
  try {
    
    const orders = await OrderModel.find({});
    res.status(201).json(orders);

  } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false });
  }
};
export const singleOrders = async(req,res) => {
  try {
    const {id} = req.params;
    const orders = await OrderModel.find({userId : id});
    res.status(201).json(orders);

  } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false });
  }
};

export const updateStatus = async (req, res) => {

  try {
   const {id} = req.params;
   const {status} = req.body;    
   if (!status || !id) {
       return res.status(404).json({ message: "User not found" });
   }
   
   const updateRole = await OrderModel.findByIdAndUpdate(id , {status} , {new : true});
   
   res.status(200).json({ updateRole, success: true, error: false });

  } catch (error) {
   res.status(500).json({ msg: error.message || error, error: true, success: false }); 

  }

}

// export const updateStatus = () => {};
