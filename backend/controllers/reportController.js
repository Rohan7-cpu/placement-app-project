const User = require("../models/User");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");

const getReports = async (req, res) => {
  try {
    const students = await User.countDocuments({ role: "Student" });

    const companies = await Company.countDocuments();

    const jobs = await Job.countDocuments();

    const applications = await Application.countDocuments();

    const interviews = await Interview.countDocuments();

    const selected = await Application.countDocuments({
      status: "Selected",
    });

    const applied = await Application.countDocuments({
      status: "Applied",
    });

    const shortlisted = await Application.countDocuments({
      status: "Shortlisted",
    });

    const interview = await Application.countDocuments({
      status: "Interview",
    });

    const rejected = await Application.countDocuments({
      status: "Rejected",
    });

    res.json({
      students,
      companies,
      jobs,
      applications,
      interviews,
      selected,
      chart: [
        { name: "Applied", value: applied },
        { name: "Shortlisted", value: shortlisted },
        { name: "Interview", value: interview },
        { name: "Selected", value: selected },
        { name: "Rejected", value: rejected },
      ],
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getReports,
};