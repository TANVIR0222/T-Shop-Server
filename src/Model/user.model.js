import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Provide Name"],
    },
    email: {
      type: String,
      require: [true, "Provide Email"],
    },
    password: {
      type: String,
      require: [true, "Provide Password"],
    },
    avatar: {
      type: String,
      require: [true, "Provide Image"],
    },

    role: {
      type: String,
      eunm: ["Admin", " USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
