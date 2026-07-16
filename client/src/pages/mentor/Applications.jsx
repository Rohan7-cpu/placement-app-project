import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

import { getApplications } from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const student = app.studentName || "";
    const company = app.company || "";
    const job = app.jobTitle || "";

    return (
      student.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase()) ||
      job.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>

      <PageHeader title="Applications" />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Applications..."
        />
      </div>

      <DataTable
        columns={[
          "Student",
          "Company",
          "Job",
          "Status",
        ]}
      >
        {filteredApplications.map((app) => (
          <tr key={app._id} className="border-b">

            <td className="p-4">{app.studentName}</td>

            <td>{app.company}</td>

            <td>{app.jobTitle}</td>

            <td>
              <StatusBadge status={app.status} />
            </td>

          </tr>
        ))}
      </DataTable>

    </DashboardLayout>
  );
}

export default Applications;