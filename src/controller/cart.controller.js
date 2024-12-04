import cartModel from "../Model/cart.model.js";

export const addToCart =async (req,res) => {
    try {

        const {userId,image,price,name} = req.body
        

        if(!userId  || !name || !image || !price){
            return res.status(400).json({message : "Please  all the fields"})
        }

        // TODO : check if product already exist in cart
        

        const data = {
            userId,
            name,
            image,
            price
        }

        const newCart = new cartModel(data);
        await newCart.save();

        res.status(201).json({success : true , newCart})
        
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 

    }
}