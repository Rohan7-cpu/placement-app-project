import { useState, useEffect } from "react";
import {
  addInterview,
  updateInterview,
} from "../../services/interviewService";

function InterviewForm({ interview, fetchInterviews, closeModal }) {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    company: "",
    jobTitle: "",
    interviewer: "",
    interviewDate: "",
    interviewTime: "",
    mode: "Online",
    venue: "",
    status: "Scheduled",
    feedback: "",
    rating: 0,
  });

  useEffect(() => {
    if (interview) {
      setFormData({
        studentName: interview.studentName || "",
        studentEmail: interview.studentEmail || "",
        company: interview.company || "",
        jobTitle: interview.jobTitle || "",
        interviewer: interview.interviewer || "",
        interviewDate: interview.interviewDate || "",
        interviewTime: interview.interviewTime || "",
        mode: interview.mode || "Online",
        venue: interview.venue || "",
        status: interview.status || "Scheduled",
        feedback: interview.feedback || "",
        rating: interview.rating || 0,
      });
    }
  }, [interview]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.studentName ||
      !formData.studentEmail ||
      !formData.company ||
      !formData.jobTitle ||
      !formData.interviewer ||
      !formData.interviewDate ||
      !formData.interviewTime ||
      !formData.venue
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (interview) {
        await updateInterview(interview._id, formData);
        alert("Interview Updated Successfully");
      } else {
        await addInterview(formData);
        alert("Interview Scheduled Successfully");
      }

      if (fetchInterviews) fetchInterviews();
      if (closeModal) closeModal();
    } catch (error) {
      console.log(error.response?.data || error);
      alert(error.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <h2 className="text-2xl font-bold">
        {interview ? "Edit Interview" : "Schedule Interview"}
      </h2>

      <input
        name="studentName"
        placeholder="Student Name"
        value={formData.studentName}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="studentEmail"
        placeholder="Student Email"
        value={formData.studentEmail}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="interviewer"
        placeholder="Interviewer"
        value={formData.interviewer}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="date"
        name="interviewDate"
        value={formData.interviewDate}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <input
        type="time"
        name="interviewTime"
        value={formData.interviewTime}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <select
        name="mode"
        value={formData.mode}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      >
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>

      <input
        name="venue"
        placeholder="Venue / Meeting Link"
        value={formData.venue}
        onChange={handleChange}
        className="w-full border p-3 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded"
      >
        {interview ? "Update Interview" : "Schedule Interview"}
      </button>

    </form>
  );
}

export default InterviewForm;