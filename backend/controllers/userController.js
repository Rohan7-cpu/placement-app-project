const User = require("../models/User");

// Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload Resume
const uploadResume = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        resume: req.file.filename,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Resume Uploaded Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  uploadResume,
  getUserProfile,
};