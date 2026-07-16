import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";

import { getInterviews } from "../../services/interviewService";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const data = await getInterviews();

      const completed = data.filter(
        (item) =>
          item.feedback &&
          item.feedback.trim() !== ""
      );

      setFeedbacks(completed);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <PageHeader title="Interview Feedback" />

      <DataTable
        columns={[
          "Student",
          "Company",
          "Job",
          "Feedback",
          "Rating",
        ]}
      >
        {feedbacks.map((item) => (
          <tr key={item._id} className="border-b">

            <td className="p-4">
              {item.studentName}
            </td>

            <td>{item.company}</td>

            <td>{item.jobTitle}</td>

            <td>{item.feedback}</td>

            <td>
              {"⭐".repeat(item.rating || 0)}
            </td>

          </tr>
        ))}
      </DataTable>

    </DashboardLayout>
  );
}

export default Feedback;