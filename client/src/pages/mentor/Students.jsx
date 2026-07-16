import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/tables/DataTable";

import { getUsers } from "../../services/userService";

const BASE_URL = "http://localhost:5000";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getUsers();

      const onlyStudents = data.filter(
        (user) => user.role === "Student"
      );

      setStudents(onlyStudents);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const name = student.name || "";
    const email = student.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>

      <PageHeader title="Students" />

      <div className="mb-5">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Student..."
        />
      </div>

      <DataTable
        columns={[
          "Name",
          "Email",
          "Resume",
        ]}
      >

        {filteredStudents.map((student) => (

          <tr key={student._id} className="border-b">

            <td className="p-4">
              {student.name}
            </td>

            <td>
              {student.email}
            </td>

            <td>

              {student.resume ? (

                <a
                  href={`${BASE_URL}/uploads/${student.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  View Resume
                </a>

              ) : (

                <span className="text-gray-500">
                  Not Uploaded
                </span>

              )}

            </td>

          </tr>

        ))}

      </DataTable>

    </DashboardLayout>
  );
}

export default Students;