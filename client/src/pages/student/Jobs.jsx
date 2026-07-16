import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import StatusBadge from "../../components/common/StatusBadge";
import DataTable from "../../components/tables/DataTable";

import { getJobs } from "../../services/jobService";
import { applyJob } from "../../services/applicationService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  const handleApply = async (job) => {
    try {
      await applyJob({
        studentName: user.name,
        studentEmail: user.email,
        company: job.company,
        jobTitle: job.title,
        status: "Applied",
      });

      alert("Application Submitted Successfully");
    } catch (error) {
      console.log(error);
      alert("Application Failed");
    }
  };

  const filteredJobs = jobs.filter((job) => {
  const title = job.title || "";
  const company = job.company || "";
  const location = job.location || "";

  return (
    title.toLowerCase().includes(search.toLowerCase()) ||
    company.toLowerCase().includes(search.toLowerCase()) ||
    location.toLowerCase().includes(search.toLowerCase())
  );
});

  return (
    <DashboardLayout>

      <PageHeader title="Available Jobs" />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Job..."
        />
      </div>

      <DataTable
        columns={[
          "Job",
          "Company",
          "Location",
          "Salary",
          "Status",
          "Apply",
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

            <td>
              <button
                onClick={() => handleApply(job)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Apply
              </button>
            </td>

          </tr>
        ))}
      </DataTable>

    </DashboardLayout>
  );
}

export default Jobs;