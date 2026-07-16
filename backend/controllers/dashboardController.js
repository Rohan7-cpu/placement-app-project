const User = require("../models/User");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");

const getDashboardStats = async (req, res) => {
  try {
    // Counts
    const students = await User.countDocuments({ role: "Student" });
    const mentors = await User.countDocuments({ role: "Mentor" });
    const admins = await User.countDocuments({ role: "Admin" });

    const companies = await Company.countDocuments();
    const jobs = await Job.countDocuments();
    const applications = await Application.countDocuments();
    const interviews = await Interview.countDocuments();

    // Pie Chart Data
    const applicationStatus = [
      {
        name: "Applied",
        value: await Application.countDocuments({ status: "Applied" }),
      },
      {
        name: "Shortlisted",
        value: await Application.countDocuments({ status: "Shortlisted" }),
      },
      {
        name: "Interview",
        value: await Application.countDocuments({ status: "Interview" }),
      },
      {
        name: "Selected",
        value: await Application.countDocuments({ status: "Selected" }),
      },
      {
        name: "Rejected",
        value: await Application.countDocuments({ status: "Rejected" }),
      },
    ];

    // Bar Chart Data
    const jobsByCompany = await Job.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $group: {
          _id: "$company.name",
          jobs: { $sum: 1 },
        },
      },
    ]);

    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,

      stats: {
    students,
     mentors,
     admins,
     companies,
     jobs,
    applications,
     interviews,
    },

      applicationStatus,

      jobsByCompany: jobsByCompany.map((item) => ({
        name: item._id,
        jobs: item.jobs,
      })),

      recentApplications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};