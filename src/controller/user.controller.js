import UserModel from "../Model/user.model.js";

export const updateRole = async (req, res) => {

   try {
    const {id} = req.params;
    const {role} = req.body;    
    if (!role || !id) {
        return res.status(404).json({ message: "User not found" });
    }
    
    const updateRole = await UserModel.findByIdAndUpdate(id , {role} , {new : true});
    
    res.status(200).json({ updateRole, success: true, error: false });

   } catch (error) {
    res.status(500).json({ msg: error.message || error, error: true, success: false }); 

   }

}

export const singleUser= async (req, res) => {

    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message: "Id not found" });
        }
        const user = await UserModel.findById(id , 'id email role name').sort({createdAt : -1})
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user, success: true, error: false });
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 

    }
}


export const allUser= async (req, res) => {

    try {
        
        const user = await UserModel.find({}, 'id email role name').sort({createdAt : -1})
        if(!user){
            return res.status(404).json(user);
        }
        res.status(200).json({ user, success: true, error: false });
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 

    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await UserModel.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" , success: true ,error:false});
        
    } catch (error) {
        res.status(500).json({ msg: error.message || error, error: true, success: false }); 
    }
}