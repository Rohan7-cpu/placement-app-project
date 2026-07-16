const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    studentEmail: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    interviewer: {
      type: String,
      required: true,
    },

    interviewDate: {
      type: String,
      required: true,
    },

    interviewTime: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["Online", "Offline"],
      default: "Online",
    },

    venue: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Completed",
        "Cancelled",
      ],
      default: "Scheduled",
    },

    feedback: {
      type: String,
      default: "",
    },

    rating: {
  type: Number,
  min: 0,
  max: 5,
  default: 0,
}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);