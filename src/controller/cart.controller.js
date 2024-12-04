import cartModel from "../Model/cart.model.js";

export const addToCart =async (req,res) => {
    try {

        const {userId,image,price,name,size} = req.body
        

        if(!userId  || !name || !image || !price || !size){
            return res.status(400).json({message : "Please  all the fields"})
        }

        const data = {
            userId,
            name,
            image,
            price,
            size
        }

        const newCart = new cartModel(data);
        await newCart.save();

        res.status(201).json({success : true , newCart})
        
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 

    }
}

export const getAllCart = async (req, res) => {
    try {

        const cart = await cartModel.find({})
        res.status(200).json(cart);
        
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false });

    }
}

export const deleteCart = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message: "Product not found" });
        }

        const product = await cartModel.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" , success: true ,error:false});
        
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 
    }
}