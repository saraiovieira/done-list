import { User } from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    // Validate if user exist in the database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
       // Create token
       const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
       // save user token
       user.token = token;
       // user
      res.status(200).json(token);
    }
    else{
        res.status(400).send("Invalid Credentials");
    }

  } catch (err) {
    console.log(err);
  }  
}