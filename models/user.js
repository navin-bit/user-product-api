const { Schema, model } = require("mongoose");

//user Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, //automatically creates createdAt and updatedAt
  }
);

//middleware
userSchema.pre("save", function (next) {
  //set createdBy to the user id if empty
  if (!this.createdBy) {
    this.createdBy = this._id;
  }
  //set updatedBy to the user id if empty
  if (!this.updatedBy) {
    this.updatedBy = this._id;
  }
  next();
});

//create user model
const User = model("User", userSchema);

module.exports = {
  User,
};
