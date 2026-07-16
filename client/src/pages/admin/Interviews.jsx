import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/tables/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import InterviewForm from "../../components/forms/InterviewForm";

import {
  getInterviews,
  deleteInterview,
} from "../../services/interviewService";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this interview?")) return;

    try {
      await deleteInterview(id);
      alert("Interview Deleted Successfully");
      fetchInterviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (interview) => {
    setSelectedInterview(interview);
    setOpen(true);
  };

  const filteredInterviews = interviews.filter((interview) => {
    const student = interview.studentName || "";
    const company = interview.company || "";
    const job = interview.jobTitle || "";

    return (
      student.toLowerCase().includes(search.toLowerCase()) ||
      company.toLowerCase().includes(search.toLowerCase()) ||
      job.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>

      <PageHeader
        title="Interviews"
        buttonText="+ Schedule Interview"
        onClick={() => {
          setSelectedInterview(null);
          setOpen(true);
        }}
      />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Interview..."
        />
      </div>

      <DataTable
        columns={[
          "Student",
          "Company",
          "Job",
          "Interviewer",
          "Date",
          "Time",
          "Mode",
          "Status",
          "Action",
        ]}
      >

        {filteredInterviews.map((interview) => (

          <tr
            key={interview._id}
            className="border-b"
          >

            <td className="p-4">{interview.studentName}</td>

            <td>{interview.company}</td>

            <td>{interview.jobTitle}</td>

            <td>{interview.interviewer}</td>

            <td>{interview.interviewDate}</td>

            <td>{interview.interviewTime}</td>

            <td>{interview.mode}</td>

            <td>
              <StatusBadge status={interview.status} />
            </td>

            <td className="space-x-2">

              <button
                onClick={() => handleEdit(interview)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(interview._id)}
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
          setSelectedInterview(null);
        }}
      >
        <InterviewForm
          interview={selectedInterview}
          fetchInterviews={fetchInterviews}
          closeModal={() => {
            setOpen(false);
            setSelectedInterview(null);
          }}
        />
      </Modal>

    </DashboardLayout>
  );
}

export default Interviews;