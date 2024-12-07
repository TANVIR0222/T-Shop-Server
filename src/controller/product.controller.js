import productModel from "../Model/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {name,description,price,category,subCategory,sizes,populer , image} = req.body;

    if (!name ||!description ||!price ||!category ||!subCategory ||!sizes) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const data ={
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        populer,
        date: Date.now(),
        image
    }    

    const product = await productModel(data)
    await product.save();
    res.status(201).json({ message: "Product added successfully" , success: true , error:false  , product});
  } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false });
  }
};

export const getAllProduct = async (req, res) => {
    try {
        const { category = '', subCategory = '', minPrice = '', maxPrice ='', search= '', page = 1, limit = 10 } = req.query;
        

        let filterProduct ={};
    
     // Filter by category
     if (category && category !== "alll") {
        filterProduct.category = category  ;
    }
        if (subCategory && subCategory !== "alll") {
        filterProduct.subCategory = subCategory;
    }

        // price calculate min & max
        if (minPrice && maxPrice) {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
  
        if (!isNaN(min) && !isNaN(max)) {
          filter.price = { $get: min, $let: max };
        }
      }

      if(search){
        filterProduct.name = { $regex: search, $options: 'i' };
      }

        const product = await productModel.find(filterProduct)
        .limit(parseInt(limit))
        .skip((page - 1) * limit)
        .exec();
        
        const total = await productModel.countDocuments();

        res.status(201).json({product , totalPage: Math.ceil(total / limit) , currentPage: parseInt(page) ,success: true , error:false});

    } catch (error) {

        res.status(500).json({ msg: error.message || error, error: true, success: false });

    }
}

export const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message: "Product not found" });
        }

        const product = await productModel.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" , success: true ,error:false});
        
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 
    }
}

export const singleProduct = async (req, res) => {

    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message: "Id not found" });
        }
        const product = await productModel.findById(id)
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product, success: true, error: false });
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 

    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {name,description,price,category,subCategory,sizes,populer , image} = req.body;
        
        const data ={
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            populer,
            date: Date.now(),
            image
        }

        const product = await productModel.findByIdAndUpdate(id, data, {new: true})
        res.status(201).json({ message: "Product update successfully" , success: true , error:false  , product});

    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false });

    }
}
