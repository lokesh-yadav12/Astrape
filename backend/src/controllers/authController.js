import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(user);

    // ✅ Cookie config
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // HTTPS only
      sameSite: "none",      // cross-site allowed (Vercel <-> Render)
      path: "/",             // 🔑 must be root for all routes
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "Signup successful",
      user: { username, email },
    });

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

    // ✅ Same cookie config as signup
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",             // 🔑 was missing earlier
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user: { username: user.username, email },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = (req, res) => {
  // ✅ must match signup/login cookie flags
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,      // match login/signup
    sameSite: "none",
    path: "/",         // must match exactly
  });
  res.json({ message: "Logged out successfully" });
};
