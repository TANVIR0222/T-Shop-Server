import imageUploadeCloudinary from "../utils/imageCloudinary.js";

const uploadeCloudinary = async (req, res) => {
  try {
    console.log(req.file);

    const file = req.file;
    const result = await imageUploadeCloudinary(file.path);
    res.status(201).json({
      message: "Property added successfully",
      success: true,
      data: result.secure_url,
      error: false,
    });
  } catch (error) {
    res
      .status(201)
      .json({ message: error.message || error, success: false, error: true });
  }
};

export default uploadeCloudinary;
