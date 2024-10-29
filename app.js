require("dotenv").config();
const express = require("express");
const { connectMongoDB } = require("./config/db");
const { userRouter } = require("./routes/user");
const { productRouter } = require("./routes/product");
const cors = require("cors");

const app = express();

// Enable CORS for all routes
app.use(cors());

const port = process.env.PORT || 3000;

connectMongoDB(process.env.MONGODB_URL);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//user routes
app.use("/api/users", userRouter);

//products routes
app.use("/api/products", productRouter);

app.post("/", (req, res) => {
  return res.send("Home");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
