import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email already exists" });
    const user = await User.create({ name, email, password: hashed, role, emailVerified: false });
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1d" });
    await sendVerificationEmail(email, token);
    res.status(201).json({ msg: "Registered. Please verify email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, jwtSecret);
    await User.findByIdAndUpdate(decoded.id, { emailVerified: true });
    res.send("✅ Email verified! You can log in now.");
  } catch {
    res.send("❌ Invalid or expired token.");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(400).json({ msg: "Invalid credentials" });
  if (!user.emailVerified)
    return res.status(403).json({ msg: "Email not verified." });
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "2d" });
  res.json({ token, role: user.role, name: user.name });
};

export const getUserProfile = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, jwtSecret);
  const user = await User.findById(decoded.id).select("-password");
  res.json(user);
};
