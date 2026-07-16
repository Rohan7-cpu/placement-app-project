import { useEffect, useState } from "react";
import { addJob, updateJob } from "../../services/jobService";

function JobForm({ job, fetchJobs, closeModal }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    status: "Active",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        salary: job.salary || "",
        description: job.description || "",
        status: job.status || "Active",
      });
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (job) {
        await updateJob(job._id, formData);
        alert("Job Updated Successfully");
      } else {
        await addJob(formData);
        alert("Job Added Successfully");
      }

      fetchJobs();
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-2xl font-bold mb-3">
        {job ? "Edit Job" : "Add Job"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        type="text"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        rows="4"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      >
        <option value="Active">Active</option>
        <option value="Closed">Closed</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
      >
        {job ? "Update Job" : "Save Job"}
      </button>

    </form>
  );
}

export default JobForm;