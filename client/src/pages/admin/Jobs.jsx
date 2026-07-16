import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import StatusBadge from "../../components/common/StatusBadge";
import DataTable from "../../components/tables/DataTable";
import Modal from "../../components/common/Modal";
import JobForm from "../../components/forms/JobForm";

import {
  getJobs,
  deleteJob,
} from "../../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(id);
      alert("Job Deleted Successfully");
      fetchJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <PageHeader
        title="Jobs"
        buttonText="+ Add Job"
        onClick={() => {
          setSelectedJob(null);
          setOpen(true);
        }}
      />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Job..."
        />
      </div>

      <DataTable
        columns={[
          "Title",
          "Company",
          "Location",
          "Salary",
          "Status",
          "Action",
        ]}
      >
        {filteredJobs.map((job) => (
          <tr key={job._id}>
            <td className="p-4">{job.title}</td>
            <td>{job.company}</td>
            <td>{job.location}</td>
            <td>{job.salary}</td>

            <td>
              <StatusBadge status={job.status} />
            </td>

            <td className="space-x-2">
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </DataTable>

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedJob(null);
        }}
      >
        <JobForm
          job={selectedJob}
          fetchJobs={fetchJobs}
          closeModal={() => {
            setOpen(false);
            setSelectedJob(null);
          }}
        />
      </Modal>
    </DashboardLayout>
  );
}

export default Jobs;