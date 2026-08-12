const authService = require("../services/authService");
const generateToken = require("../utils/jwt");

const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Account Created Successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const profile = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

const updateProfile = async (req, res) => {
  try {
    const user = await authService.updateProfile(
      req.user.id,
      req.body
    );

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  profile,
  updateProfile,
};
