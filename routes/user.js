const express = require("express");
const {
  signup,
  login,
  addUser,
  updateUserById,
  getAllUsers,
  getUserById,
} = require("../controllers/user");
const { auth } = require("../middlewares/auth");

const {
  userValidation,
  loginValidation,
} = require("../middlewares/validation");

const userRouter = express.Router();

userRouter.post("/signup", userValidation, signup);
userRouter.post("/login", loginValidation, login);
userRouter.post("/add", userValidation, addUser);
userRouter.put("/update/:id", updateUserById);
userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUserById);

module.exports = {
  userRouter,
};

// POST api/users/register                    -  register new user
// POST api/users/login                    - login user
// POST api/users                    -    add new user
// PUT api/users/:id                -     update user by id
// GET api/users                       -     get all user
// GET api/users/:id                 -     get each user details
