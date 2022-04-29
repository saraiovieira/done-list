import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { config } from "dotenv";
config();

export const validate = (method) => {
  switch (method) {
    case "register": {
      return [
        check("email", "Email is invalid").isEmail(),
        check("password", "Password is invalid").isLength({ min: 1 }),
      ];
    }
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const oldUser = await User.findOne({ email: email });

    console.log(oldUser);
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
