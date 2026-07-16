import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import DataTable from "../../components/tables/DataTable";

import { getApplications } from "../../services/applicationService";
import { getInterviews } from "../../services/interviewService";
import { getSkills } from "../../services/skillService";
import { getProfile } from "../../services/userService";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    appliedJobs: 0,
    interviews: 0,
    skills: 0,
    resume: "Not Uploaded",
  });

  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const profile = await getProfile(user.id);

      const applicationData = await getApplications();

      const interviewData = await getInterviews();

      const skillData = await getSkills();

      const myApplications = applicationData.filter(
        (app) => app.studentEmail === user.email
      );

      const myInterviews = interviewData.filter(
        (item) => item.studentEmail === user.email
      );

      const mySkills = skillData.filter(
        (skill) => skill.studentEmail === user.email
      );

      setApplications(myApplications);

      setInterviews(myInterviews);

      setStats({
        appliedJobs: myApplications.length,
        interviews: myInterviews.filter(
          (item) => item.status === "Scheduled"
        ).length,
        skills: mySkills.length,
        resume: profile.resume ? "Uploaded ✅" : "Not Uploaded ❌",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <PageHeader title="Student Dashboard" />

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Applied Jobs
          </h3>

          <p className="text-4xl font-bold text-blue-600">
            {stats.appliedJobs}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Upcoming Interviews
          </h3>

          <p className="text-4xl font-bold text-green-600">
            {stats.interviews}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            My Skills
          </h3>

          <p className="text-4xl font-bold text-purple-600">
            {stats.skills}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">
            Resume
          </h3>

          <p className="text-xl font-bold text-orange-600">
            {stats.resume}
          </p>
        </div>

      </div>

      {/* Recent Applications */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-bold mb-4">
          Recent Applications
        </h2>

        <DataTable
          columns={[
            "Company",
            "Job",
            "Status",
          ]}
        >
          {applications.slice(0, 5).map((app) => (
            <tr key={app._id}>

              <td className="p-4">
                {app.company}
              </td>

              <td>{app.jobTitle}</td>

              <td>{app.status}</td>

            </tr>
          ))}
        </DataTable>

      </div>

      {/* Upcoming Interviews */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Upcoming Interviews
        </h2>

        <DataTable
          columns={[
            "Company",
            "Date",
            "Time",
            "Status",
          ]}
        >
          {interviews
            .filter(
              (item) => item.status === "Scheduled"
            )
            .map((item) => (
              <tr key={item._id}>

                <td className="p-4">
                  {item.company}
                </td>

                <td>{item.interviewDate}</td>

                <td>{item.interviewTime}</td>

                <td>{item.status}</td>

              </tr>
            ))}
        </DataTable>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;