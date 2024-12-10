import cartModel from "../Model/cart.model.js";
import OrderModel from "../Model/order.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Deliverycharge = 10;

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, totalAmount } = req.body;
    const orderData = {
      userId,
      items,
      address,
      totalAmount,
      paymentMethod: "usd",
      payment: false,
    };

    const newOrder = await OrderModel(orderData);
    await newOrder.save();
    res
      .status(201)
      .json({
        message: "order successfully",
        success: true,
        error: false,
        newOrder,
      });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};
export const placeOrderStripe = async (req, res) => {
  //stripe payment

  try {
    const { userId, items, address, totalAmount } = req.body;
    
    const { origin } = process.env.URL

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${process.env.URL}/cancel`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: parseInt(totalAmount * 100),
            product_data: {
              name: "Total Price",
            },
          },
          quantity: 1,
        },
      ],
    });

    if (origin) {
      const orderData = {
        userId,
        items,
        address,
        totalAmount,
        paymentMethod: "stripe",
        payment: true,
      };
      const newOrder = await OrderModel(orderData);
      await newOrder.save();
    }

    res
      .status(201)
      .json({
        message: "successfully",
        session: session.url,
        success: true,
        error: false,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

export const allOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    res.status(201).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};
export const singleOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await OrderModel.find({ userId: id });
    res.status(201).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !id) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateRole = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json({ updateRole, success: true, error: false });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

export const verifyStripe = async (req, res) => {
  try {
    const { id , succes } = req.body;
    if (succes) {

     const order = await cartModel.deleteMany({userId: id});
      res.status(201).json(order);

    }
  } catch (error) {
    
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

// export const updateStatus = () => {};
