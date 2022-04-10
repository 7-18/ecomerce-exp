import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import server from "./config/server.js";

import Admin from "./routes/Admin.js";
import User from "./routes/User.js";
import Product from "./routes/Product.js";
import WishList from "./routes/WishList.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/admin", Admin);
app.use("/api/user", User);
app.use("/api/product", Product);
app.use("/api/wishlist", WishList);

app.listen(process.env.PORT, () =>
  console.log("Server running on port: " + process.env.PORT)
);

server.dbConnection();