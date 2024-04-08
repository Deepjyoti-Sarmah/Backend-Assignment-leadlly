require("dotenv").config({path: './.env'});
import express from "express";
import cors from "cors";
const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));


// app.get("/", (req, res) => {
//   return res.status(200).json({
//     msg: "health check"
//   });
// });

import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);



export {app}
