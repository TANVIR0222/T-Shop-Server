import UserModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPass = await bcrypt.hashSync(password, 10);

    const data = {
      name,
      email,
      password: hashPass,
    };
    const newUser = new UserModel(data);
    await newUser.save();

    res.status(201).json({
      msg: "User Create Success",
      error: false,
      success: true,
      user: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.status(201).json({
      msg: "User Create Success",
      error: false,
      success: true,
      user: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: error.message || error, error: true, success: false });
  }
};
