import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";

import {
  getInterviews,
  updateInterview,
} from "../../services/interviewService";

function Interviews() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await getInterviews();
      setInterviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateInterview(id, { status });
      fetchInterviews();
    } catch (error) {
      console.log(error);
    }
  };

  const updateFeedback = async (id, feedback) => {
    try {
      await updateInterview(id, { feedback });
      fetchInterviews();
    } catch (error) {
      console.log(error);
    }
  };

  const updateRating = async (id, rating) => {
    try {
      await updateInterview(id, { rating: Number(rating) });
      fetchInterviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <PageHeader title="Mentor Interviews" />

      <DataTable
        columns={[
          "Student",
          "Company",
          "Job",
          "Date",
          "Time",
          "Status",
          "Feedback",
          "Rating",
        ]}
      >
        {interviews.map((item) => (
          <tr key={item._id} className="border-b">

            <td className="p-4">{item.studentName}</td>

            <td>{item.company}</td>

            <td>{item.jobTitle}</td>

            <td>{item.interviewDate}</td>

            <td>{item.interviewTime}</td>

            <td>
              <select
                value={item.status}
                onChange={(e) =>
                  updateStatus(item._id, e.target.value)
                }
                className="border rounded px-2 py-1"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>

            <td>
              <textarea
                defaultValue={item.feedback}
                placeholder="Enter feedback..."
                rows="2"
                className="border rounded p-2 w-56"
                onBlur={(e) =>
                  updateFeedback(item._id, e.target.value)
                }
              />
            </td>

            <td>
              <select
                value={item.rating || 0}
                onChange={(e) =>
                  updateRating(item._id, e.target.value)
                }
                className="border rounded px-2 py-1"
              >
                <option value="0">Select</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐⭐ 2</option>
                <option value="3">⭐⭐⭐ 3</option>
                <option value="4">⭐⭐⭐⭐ 4</option>
                <option value="5">⭐⭐⭐⭐⭐ 5</option>
              </select>
            </td>

          </tr>
        ))}
      </DataTable>

    </DashboardLayout>
  );
}

export default Interviews;