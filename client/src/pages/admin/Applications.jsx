import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";

import {
  getApplications,
  updateApplication,
  deleteApplication,
} from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);

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

  const changeStatus = async (id, status) => {
    try {
      await updateApplication(id, { status });
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;

    try {
      await deleteApplication(id);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <PageHeader title="Applications" />

      <DataTable
        columns={[
          "Student",
          "Email",
          "Company",
          "Job",
          "Status",
          "Actions",
        ]}
      >

        {applications.map((app) => (
          <tr key={app._id}>

            <td className="p-4">{app.studentName}</td>

            <td>{app.studentEmail}</td>

            <td>{app.company}</td>

            <td>{app.jobTitle}</td>

            <td>
              <select
                value={app.status}
                onChange={(e) =>
                  changeStatus(app._id, e.target.value)
                }
                className="border rounded px-2 py-1"
              >
                <option>Applied</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Selected</option>
                <option>Rejected</option>
              </select>
            </td>

            <td>
              <button
                onClick={() => handleDelete(app._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </td>

          </tr>
        ))}

      </DataTable>

    </DashboardLayout>
  );
}

export default Applications;