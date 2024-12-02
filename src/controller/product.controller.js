import productModel from "../Model/product.model.js";
import imageUploadeCloudinary from "../utils/imageCloudinary.js";

export const addProduct = async (req, res) => {
  try {
    const {name,description,price,category,subCategory,sizes,populer} = req.body;

    if (!name ||!description ||!price ||!category ||!subCategory ||!sizes ||!populer) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const image = req.file;
    const productImage = await imageUploadeCloudinary(image.path);

    const data ={
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        populer,
        date: Date.now(),
        image:productImage.secure_url
    }

    const product = await productModel(data)
    await product.save();
    res.status(201).json({ message: "Product added successfully" , success: true , error:false  , product});
  } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false });
  }
};
