import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";


export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(user);

    // Set token as HttpOnly cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",  // or 'none' if cross-site
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({ message: "Signup successful", user: { username, email } });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", user: { username: user.username, email } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure:false,
    sameSite: "lax",
    path: "/",   
  });
  res.json({ message: "Logged out successfully" });
};



// export const signup = async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword });
//     res.status(201).json({ token: generateToken(user) });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     res.json({ token: generateToken(user) });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
    