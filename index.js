import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import { connectDB } from "./src/DB/connectDB.js";


// middel
const app = express();
const port = 8080;
app.use(
  cors({
    origin: process.env.URL,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


connectDB().then(() => (
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    })
))



//AsAtssD2TBxYkoTK.   xrlTfeB1olFj9OgE