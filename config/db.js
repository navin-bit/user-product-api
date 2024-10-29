const { connect } = require("mongoose");

const connectMongoDB = async (url) => {
  return await connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB connected......"))
    .catch(() => console.log("MongoDB not connected......"));
};

module.exports = {
  connectMongoDB,
};
