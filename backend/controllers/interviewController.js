const Interview = require("../models/Interview");

// Get Interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Interview
const addInterview = async (req, res) => {
  try {
    console.log("Interview Data:", req.body);

    const interview = await Interview.create(req.body);

    res.status(201).json({
      success: true,
      message: "Interview Scheduled Successfully",
      interview,
    });
  } catch (error) {
    console.log("Interview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Interview
const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Interview Updated Successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Interview
const deleteInterview = async (req, res) => {
  try {
    await Interview.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Interview Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getInterviews,
  addInterview,
  updateInterview,
  deleteInterview,
};