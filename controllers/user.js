const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { logger } = require("../middlewares/logger");

const signup = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    //check user already exist
    const userExist = await User.findOne({ email });

    if (userExist) {
      logger.error("signup : user already exists");
      return res.status(404).json({ message: "user already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10); //hash password

    const newUser = await User({
      username,
      email,
      password: hashPassword,
      phone,
      address,
    });

    await newUser.save();

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    logger.error("signup: Internal Server Error");
    return res.status(500).json({ message: "signup Internal Server Error" });
  }
};

//Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //check user  valid or Invalid
    if (!user) {
      logger.error("login :Invalid  email or password");
      return res.status(400).json({ message: "Invalid  email or password" });
    }

    const isMatchPassword = await bcryptjs.compare(password, user.password); //compare password

    //check password  valid or Invalid
    if (!isMatchPassword) {
      logger.error("login :Invalid  email or password");
      return res.status(400).json({ message: "Invalid  email or password" });
    }

    //create token using user id and JWT_SECRET_KEY
    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "8h" }
    );

    return res
      .status(200)
      .json({ token: token, message: "login successfully" });
  } catch (error) {
    logger.error("login: Internal Server Error");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addUser = async (req, res) => {
  const { username, email, password, phone, address } = req.body;

  try {
    //check user already exist
    const userExist = await User.findOne({ email });

    if (userExist) {
      logger.error("addUser : user already exists");

      return res.status(404).json({ message: "user already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10); //hash password

    const newUser = await User({
      username,
      email,
      password: hashPassword,
      phone,
      address,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });
    await newUser.save();

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    logger.error("addUser:Internal Server Error");
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (error) {
    logger.error("getAllUsers:Internal Server Error");
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, //update document
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "update user successfully" });
  } catch (error) {
    logger.error("updateUserById:update user successfully");
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(201).json(user);
  } catch (error) {
    logger.error("getUserById: Internal Server Error");
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

module.exports = {
  addUser,
  updateUserById,
  getAllUsers,
  getUserById,
  signup,
  login,
};
