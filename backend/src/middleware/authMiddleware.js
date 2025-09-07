import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // ✅ Get token from cookies instead of headers
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // you can also store full user if needed
    console.log(decoded);
    next();
  } catch (err) {
    console.log("wrong");
    return res.status(401).json({ message: "Invalid token" });
  }
};
