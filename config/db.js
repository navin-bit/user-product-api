const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  return await mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB connected....");
    })
    .catch((err) => {
      console.log("MongoDB not connected....", err);
    });
};

module.exports = {
  connectMongoDB,
};
