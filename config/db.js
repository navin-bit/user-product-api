const { connect } = require("mongoose");

const connectMongoDB = async (url) => {
  return await connect(url)
    .then(() => console.log("MongoDB connected......"))
    .catch(() => console.log("MongoDB not connected......"));
};

module.exports = {
  connectMongoDB,
};
