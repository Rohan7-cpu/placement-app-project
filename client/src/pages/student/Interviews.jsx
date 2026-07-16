import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

import { getInterviews } from "../../services/interviewService";

function Interviews() {
  const [interviews, setInterviews] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await getInterviews();

      const myInterviews = data.filter(
        (item) => item.studentEmail === user.email
      );

      setInterviews(myInterviews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <PageHeader title="My Interviews" />

      <DataTable
        columns={[
          "Company",
          "Job",
          "Date",
          "Time",
          "Mode",
          "Status",
          "Rating",
          "Feedback",
        ]}
      >
        {interviews.map((item) => (
          <tr key={item._id}>

            <td className="p-4">{item.company}</td>

            <td>{item.jobTitle}</td>

            <td>{item.interviewDate}</td>

            <td>{item.interviewTime}</td>

            <td>{item.mode}</td>

            <td>
              <StatusBadge status={item.status} />
            </td>

            <td>
              {item.status === "Completed"
                ? item.rating > 0
                  ? "⭐".repeat(item.rating)
                  : "Not Rated"
                : "-"}
            </td>

            <td style={{ maxWidth: "300px" }}>
              {item.status === "Completed"
                ? item.feedback || "No Feedback"
                : "Interview Pending"}
            </td>

          </tr>
        ))}
      </DataTable>

    </DashboardLayout>
  );
}

export default Interviews;