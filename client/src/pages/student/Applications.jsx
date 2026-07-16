import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

import { getApplications } from "../../services/applicationService";

function Applications() {
  const [applications, setApplications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const data = await getApplications();

    const myApplications = data.filter(
      (app) => app.studentEmail === user.email
    );

    setApplications(myApplications);
  };

  return (
    <DashboardLayout>

      <PageHeader title="My Applications" />

      <DataTable
        columns={[
          "Company",
          "Job",
          "Status",
        ]}
      >
        {applications.map((app) => (
          <tr key={app._id}>

            <td className="p-4">{app.company}</td>

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