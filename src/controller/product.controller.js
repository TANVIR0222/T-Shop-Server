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
        const { category = '', subCategory = '', search= '', page = 1, limit = 10 } = req.query;
        let filterProduct ={};
    
     // Filter by category
     if (category && category !== "alll") {
        filterProduct.category = category  ;
    }
        if (subCategory && subCategory !== "alll") {
        filterProduct.subCategory = subCategory;
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

export const allProduct = async (req, res) => {
    try {

        const {search = ''} = req.query;
        const products = await productModel.find({name:{$regex: search ,$options:'i'}})

        res.status(201).json(products);
    } catch (error) {
      res.status(500).json({ msg: error.message || error, error: true, success: false });
    }
  };



export const relatedProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    

    if (!id) {
      res.status(404).send({ message: " Product Id is required " });
    }

    const product = await productModel.findById(id)
    if (!product) {
      res.status(404).send({ message: "Error Product Not Found Database " });
    }

    //
    const titleRegex = new RegExp( // 1 word ar sathe onnow 1 word ar kicu mit khuje berkra 
      product.name
        .split(" ") //  product.name is "Red Apple Juice", the result of .split(" ") would be: ["Red", "Apple", "Juice"]
        .filter((word) => word.length > 1)
        .join("|"), // alada alada word ke ak sathe  ["Red", "Apple", "Juice"] becomes "Red|Apple|Juice"
      "i" // the end
    );

    const relatedProduct = await productModel.find({
      _id: { $ne: id }, // $ne is a MongoDB query operator meaning "not equal." & ai id chara annow relatibe  id gula ke khuje 
      $or: [{ name: { $regex: titleRegex } }, { category: product.category }], // name and category uopre nirbor kore khuje 
    }); 

    res.status(201).send(relatedProduct);
  } catch (error) {
    res.status(404).send({ message: "Error Product Not Found " });
}
};